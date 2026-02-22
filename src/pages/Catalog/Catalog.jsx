import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { fetchRootCategories, getCategoryImageUrl } from '@/api/categoriesApi'
import styles from './Catalog.module.css'

/** Главная страница каталога — корневые категории с site_integrations по слагу сайта (buildgood). */
export default function Catalog() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchRootCategories(siteConfig.siteSlug).then((list) => {
      setCategories(list)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className={styles.catalog}>
        <div className={styles.container}>
          <div className={styles.empty}><p>Загрузка...</p></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Каталог</h1>
          <p className={styles.subtitle}>Выберите категорию</p>
        </div>

        {categories.length === 0 ? (
          <div className={styles.empty}>
            <p>Категории не найдены</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {categories.map((cat) => {
              const imageUrl = getCategoryImageUrl(cat)
              return (
                <Link
                  key={cat.id}
                  to={`/catalog/${cat.id}`}
                  className={`${styles.categoryCard} ${!imageUrl ? styles.categoryCardNoImage : ''}`}
                >
                  {imageUrl ? (
                    <>
                      <div className={styles.imageWrapper}>
                        <img src={imageUrl} alt={cat.name} className={styles.image} />
                        <div className={styles.overlay} />
                      </div>
                      <div className={styles.content}>
                        <h2 className={styles.categoryName}>{cat.name}</h2>
                      </div>
                    </>
                  ) : (
                    <div className={styles.categoryCardVisual}>
                      <span className={styles.categoryCardIcon}>📦</span>
                      <h2 className={styles.categoryName}>{cat.name}</h2>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
