import { getCategoryWithChildren } from '@/lib/api'
import { getCategoryImageUrl } from '@/lib/image-utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '../page.module.css'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const data = await getCategoryWithChildren(id)
  if (!data) return { title: 'Каталог' }
  return {
    title: data.category.name,
    description:
      data.category.description ||
      `Категория «${data.category.name}» — ${siteConfig.name}, плитка в ${siteConfig.city}`,
  }
}

export default async function CatalogCategoryPage({ params }: Props) {
  const { id } = await params
  const data = await getCategoryWithChildren(id)

  if (!data) {
    notFound()
  }

  const { category, children } = data

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{category.name}</h1>
          {category.description && (
            <p className={styles.subtitle}>{category.description}</p>
          )}
        </div>

        {children.length === 0 ? (
          <div className={styles.empty}>
            <p>Подкатегории не найдены</p>
            <Link href="/catalog" className={styles.backLink}>
              ← Вернуться в каталог
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {children.map((child) => {
              const imageUrl = getCategoryImageUrl(child)
              const categoryUrl = `/catalog/${child.id}`

              return (
                <Link
                  key={child.id}
                  href={categoryUrl}
                  className={styles.categoryCard}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={child.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={child.ordering < 3}
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        <span className={styles.placeholderIcon}>📦</span>
                      </div>
                    )}
                    <div className={styles.overlay} />
                  </div>
                  <div className={styles.content}>
                    <h2 className={styles.categoryName}>{child.name}</h2>
                    {child.description && (
                      <p className={styles.categoryDescription}>
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <div className={styles.backBlock}>
          <Link href="/catalog" className={styles.backLink}>
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  )
}
