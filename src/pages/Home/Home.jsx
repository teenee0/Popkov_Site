import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { fetchRootCategories, fetchLatestProducts, getCategoryImageUrl } from '@/api/categoriesApi'
import { ENV_CONFIG } from '@/config/environment'
import styles from './Home.module.css'
import catalogStyles from '../Catalog/Catalog.module.css'

const API_BASE = (ENV_CONFIG?.API_BASE_URL || '').replace(/\/$/, '')

function getProductImageUrl(product) {
  const url = product?.main_image
  if (!url) return null
  if (typeof url === 'string' && url.startsWith('http')) return url
  return url ? `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}` : null
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselPages, setCarouselPages] = useState(0)
  const carouselRef = useRef(null)

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    fetchRootCategories(siteConfig.siteSlug).then((list) => {
      setCategories(list || [])
      setCategoriesLoading(false)
    })
    fetchLatestProducts(siteConfig.siteSlug, 10).then((list) => {
      setProducts(list || [])
      setProductsLoading(false)
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Число точек = число карточек
  useEffect(() => {
    setCarouselPages(categories.length)
  }, [categories])

  // Синхронизация индекса по карточкам: ширина первой карточки как шаг
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScroll = () => {
      const firstCard = el.firstElementChild
      if (!firstCard) return
      const cardWidth = firstCard.getBoundingClientRect().width
      const gap = parseFloat(getComputedStyle(el).gap) || 0
      const step = cardWidth + gap
      if (step <= 0) return
      const idx = Math.round(el.scrollLeft / step)
      setCarouselIndex(Math.min(Math.max(idx, 0), categories.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [categories])

  const goToPage = (index) => {
    const el = carouselRef.current
    if (!el || categories.length === 0) return
    const i = ((index % categories.length) + categories.length) % categories.length
    const firstCard = el.firstElementChild
    if (!firstCard) return
    const cardWidth = firstCard.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(el).gap) || 0
    const step = cardWidth + gap
    setCarouselIndex(i)
    el.scrollTo({ left: i * step, behavior: 'smooth' })
  }

  const scrollCarousel = (dir) => {
    goToPage(carouselIndex + (dir === 'next' ? 1 : -1))
  }

  const advantages = [
    { icon: '📦', title: 'Широкий ассортимент', description: 'Более 5000 видов плитки от ведущих производителей' },
    { icon: '🚚', title: 'Доставка', description: `Быстрая доставка по ${siteConfig.city} и области` },
    { icon: '⭐', title: 'Качество', description: 'Только сертифицированная плитка премиум-класса' },
    { icon: '🎯', title: 'Опыт', description: `Более 15 лет на рынке плитки и отделочных материалов в ${siteConfig.city}` },
  ]

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Плитка в {siteConfig.city}
            <span className={styles.heroTitleAccent}> качество и стиль для вашего дома</span>
          </h1>
          <p className={styles.heroDescription}>
            {siteConfig.description}. Мы предлагаем широкий выбор плитки для ванной, кухни, гостиной и других помещений по доступным ценам в {siteConfig.city}.
          </p>
          <div className={styles.heroActions}>
            <Link to="/catalog" className={styles.buttonPrimary}>
              Перейти в каталог
            </Link>
            <Link to="/contacts" className={styles.buttonSecondary}>
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Наши категории</h2>
          {categoriesLoading ? (
            <p className={styles.categoriesLoading}>Загрузка категорий...</p>
          ) : categories.length === 0 ? (
            <p className={styles.categoriesEmpty}>Категории пока не добавлены</p>
          ) : isDesktop && categories.length < 4 ? (
            <div className={styles.categoriesGrid}>
              {categories.map((cat) => {
                const imageUrl = getCategoryImageUrl(cat)
                return (
                  <Link
                    key={cat.id}
                    to={`/catalog/${cat.id}`}
                    className={`${catalogStyles.categoryCard} ${!imageUrl ? catalogStyles.categoryCardNoImage : ''}`}
                  >
                    {imageUrl ? (
                      <>
                        <div className={catalogStyles.imageWrapper}>
                          <img src={imageUrl} alt={cat.name} className={catalogStyles.image} />
                          <div className={catalogStyles.overlay} />
                        </div>
                        <div className={catalogStyles.content}>
                          <h2 className={catalogStyles.categoryName}>{cat.name}</h2>
                        </div>
                      </>
                    ) : (
                      <div className={catalogStyles.categoryCardVisual}>
                        <span className={catalogStyles.categoryCardIcon}>📦</span>
                        <h2 className={catalogStyles.categoryName}>{cat.name}</h2>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className={styles.carouselWrap}>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() => scrollCarousel('prev')}
                aria-label="Назад"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div ref={carouselRef} className={styles.categoriesCarousel}>
                {categories.map((cat) => {
                  const imageUrl = getCategoryImageUrl(cat)
                  return (
                    <Link
                      key={cat.id}
                      to={`/catalog/${cat.id}`}
                      className={`${catalogStyles.categoryCard} ${!imageUrl ? catalogStyles.categoryCardNoImage : ''}`}
                    >
                      {imageUrl ? (
                        <>
                          <div className={catalogStyles.imageWrapper}>
                            <img src={imageUrl} alt={cat.name} className={catalogStyles.image} />
                            <div className={catalogStyles.overlay} />
                          </div>
                          <div className={catalogStyles.content}>
                            <h2 className={catalogStyles.categoryName}>{cat.name}</h2>
                          </div>
                        </>
                      ) : (
                        <div className={catalogStyles.categoryCardVisual}>
                          <span className={catalogStyles.categoryCardIcon}>📦</span>
                          <h2 className={catalogStyles.categoryName}>{cat.name}</h2>
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
              <button
                type="button"
                className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
                onClick={() => scrollCarousel('next')}
                aria-label="Вперёд"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {carouselPages > 1 && (
                <div className={styles.carouselDots}>
                  {Array.from({ length: carouselPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.carouselDot} ${i === carouselIndex ? styles.carouselDotActive : ''}`}
                      onClick={() => goToPage(i)}
                      aria-label={`Слайд ${i + 1}`}
                      aria-current={i === carouselIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {(productsLoading || products.length > 0) && (
        <section className={styles.productsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Наши товары</h2>
            {productsLoading ? (
              <p className={styles.categoriesLoading}>Загрузка товаров...</p>
            ) : (
              <>
                <div className={`${catalogStyles.grid} ${catalogStyles.productGrid} ${styles.productsGrid}`}>
                  {products.map((product) => {
                    const imageUrl = getProductImageUrl(product)
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className={`${catalogStyles.categoryCard} ${catalogStyles.productCard}`}
                      >
                        <div className={catalogStyles.productImageWrap}>
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.name} className={catalogStyles.productImage} />
                          ) : (
                            <div className={catalogStyles.placeholder}>
                              <span className={catalogStyles.placeholderIcon}>🛒</span>
                            </div>
                          )}
                          <div className={catalogStyles.overlay} />
                        </div>
                        <div className={catalogStyles.content}>
                          <h2 className={catalogStyles.categoryName}>{product.name}</h2>
                          {product.min_price != null && (
                            <p className={catalogStyles.productPrice}>
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
                <div className={styles.productsSeeAll}>
                  <Link to="/catalog" className={styles.buttonRed}>
                    Смотреть весь каталог
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Как нас найти</h2>
          <div className={styles.mapWrap}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=69.379694%2C53.290468&mode=poi&poi%5Bpoint%5D=69.379407%2C53.290435&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D206482115489&utm_source=share&z=19.47"
              width="100%"
              height="400"
              frameBorder="1"
              allowFullScreen
              title="Яндекс Карта — Кафель & Ламинат"
              style={{ display: 'block', borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      <section className={styles.advantages}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
          <div className={styles.advantagesGrid}>
            {advantages.map((advantage, index) => (
              <div key={index} className={styles.advantageCard}>
                <div className={styles.advantageIcon}>{advantage.icon}</div>
                <h3 className={styles.advantageTitle}>{advantage.title}</h3>
                <p className={styles.advantageDescription}>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Готовы выбрать плитку?</h2>
            <p className={styles.ctaDescription}>
              Свяжитесь с нами для консультации по выбору плитки и расчета стоимости
            </p>
            <div className={styles.ctaActions}>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.buttonPrimary}>
                Позвонить: {siteConfig.phone}
              </a>
              <Link to="/contacts" className={styles.buttonSecondary}>
                Написать нам
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
