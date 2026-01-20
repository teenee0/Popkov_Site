import { categoriesApi, Category } from '@/lib/api'
import { getCategoryImageUrl } from '@/lib/image-utils'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { siteConfig } from '@/config/site'

// Принудительно используем динамическую генерацию (SSR) вместо статической (SSG)
// Это гарантирует, что данные будут загружаться при каждом запросе страницы
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Каталог',
  description: `Каталог плитки в ${siteConfig.city}. Широкий ассортимент керамической плитки и керамогранита`,
}

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await categoriesApi.getAll()
    // Фильтруем только активные категории и сортируем по ordering
    return categories
      .filter((cat) => cat.is_active)
      .sort((a, b) => a.ordering - b.ordering)
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error)
    return []
  }
}

export default async function CatalogPage() {
  const categories = await getCategories()

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Каталог</h1>
          <p className={styles.subtitle}>
            Выберите интересующую вас категорию
          </p>
        </div>

        {categories.length === 0 ? (
          <div className={styles.empty}>
            <p>Категории не найдены</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {categories.map((category) => {
              const imageUrl = getCategoryImageUrl(category)
              const categoryUrl = category.page_identificator
                ? `/catalog/${category.page_identificator}`
                : `/catalog/${category.id}`

              return (
                <Link
                  key={category.id}
                  href={categoryUrl}
                  className={styles.categoryCard}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={category.ordering < 3}
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        <span className={styles.placeholderIcon}>📦</span>
                      </div>
                    )}
                    <div className={styles.overlay} />
                  </div>
                  <div className={styles.content}>
                    <h2 className={styles.categoryName}>{category.name}</h2>
                    {category.description && (
                      <p className={styles.categoryDescription}>
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

