import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import {
  fetchCategoryWithChildren,
  fetchCategoryProducts,
  getCategoryImageUrl,
} from '@/api/categoriesApi'
import { ENV_CONFIG } from '@/config/environment'
import styles from '../Catalog/Catalog.module.css'

const API_BASE = (ENV_CONFIG?.API_BASE_URL || '').replace(/\/$/, '')

function getProductImageUrl(product) {
  const url = product?.main_image
  if (!url) return null
  if (typeof url === 'string' && url.startsWith('http')) return url
  return url ? `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}` : null
}

export default function CatalogCategory() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setProducts([])
    fetchCategoryWithChildren(siteConfig.siteSlug, id).then((res) => {
      setData(res)
      if (!res) {
        setLoading(false)
        return
      }
      if (!res.children || res.children.length === 0) {
        fetchCategoryProducts(siteConfig.siteSlug, id).then((list) => {
          setProducts(Array.isArray(list) ? list : [])
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })
  }, [id])

  if (loading) {
    return (
      <div className={styles.catalog}>
        <div className={styles.container}>
          <div className={styles.empty}><p>Загрузка...</p></div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.catalog}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link to="/catalog" className={styles.backLink}>← Каталог</Link>
          </div>
          <div className={styles.empty}>
            <p>Категория не найдена</p>
            <Link to="/catalog" className={styles.backLink}>Вернуться в каталог</Link>
          </div>
        </div>
      </div>
    )
  }

  const { category, children } = data
  const hasChildren = children.length > 0
  const hasProducts = products.length > 0

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/catalog" className={styles.backLink}>← Каталог</Link>
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>{category.name}</h1>
          {category.description && (
            <p className={styles.subtitle}>{category.description}</p>
          )}
        </div>

        {hasChildren ? (
          <>
            <div className={styles.grid}>
              {children.map((child) => {
                const imageUrl = getCategoryImageUrl(child)
                return (
                  <Link
                    key={child.id}
                    to={`/catalog/${child.id}`}
                    className={`${styles.categoryCard} ${!imageUrl ? styles.categoryCardNoImage : ''}`}
                  >
                    {imageUrl ? (
                      <>
                        <div className={styles.imageWrapper}>
                          <img src={imageUrl} alt={child.name} className={styles.image} />
                          <div className={styles.overlay} />
                        </div>
                        <div className={styles.content}>
                          <h2 className={styles.categoryName}>{child.name}</h2>
                        </div>
                      </>
                    ) : (
                      <div className={styles.categoryCardVisual}>
                        <span className={styles.categoryCardIcon}>📦</span>
                        <h2 className={styles.categoryName}>{child.name}</h2>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
            <div className={styles.backBlock}>
              <Link to="/catalog" className={styles.backLink}>← Вернуться в каталог</Link>
            </div>
          </>
        ) : hasProducts ? (
          <>
            <div className={`${styles.grid} ${styles.productGrid}`}>
              {products.map((product) => {
                const imageUrl = getProductImageUrl(product)
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`${styles.categoryCard} ${styles.productCard}`}
                  >
                    <div className={styles.productImageWrap}>
                      {imageUrl ? (
                        <img src={imageUrl} alt={product.name} className={styles.productImage} />
                      ) : (
                        <div className={styles.placeholder}>
                          <span className={styles.placeholderIcon}>🛒</span>
                        </div>
                      )}
                      <div className={styles.overlay} />
                    </div>
                    <div className={styles.content}>
                      <h2 className={styles.categoryName}>{product.name}</h2>
                      {product.min_price != null && (
                        <p className={styles.productPrice}>
                          {Number(product.min_price).toLocaleString('ru-RU')}
                          {product.max_price != null && Number(product.max_price) !== Number(product.min_price)
                            ? ` — ${Number(product.max_price).toLocaleString('ru-RU')}`
                            : ''} ₽
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className={styles.backBlock}>
              <Link to="/catalog" className={styles.backLink}>← Вернуться в каталог</Link>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <p>Товары не найдены</p>
            <Link to="/catalog" className={styles.backLink}>Вернуться в каталог</Link>
          </div>
        )}
      </div>
    </div>
  )
}
