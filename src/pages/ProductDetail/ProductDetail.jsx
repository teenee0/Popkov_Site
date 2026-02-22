import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { fetchProductDetail } from '@/api/categoriesApi'
import { ENV_CONFIG } from '@/config/environment'
import catalogStyles from '../Catalog/Catalog.module.css'
import styles from './ProductDetail.module.css'

const API_BASE = (ENV_CONFIG?.API_BASE_URL || '').replace(/\/$/, '')

function getImageUrl(image) {
  if (!image) return null
  const path = typeof image === 'string' ? image : image?.image || image?.url
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

function getProductCardImageUrl(product) {
  const main = product?.main_image
  if (!main) return null
  if (typeof main === 'object' && main.image) return getImageUrl(main.image)
  return getImageUrl(main)
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [activeTab, setActiveTab] = useState('specs')
  const [showAllStores, setShowAllStores] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const imagesCount = data?.product?.images?.length ?? 0

  const goToPrev = () => {
    if (imagesCount <= 1) return
    setSelectedImageIndex((i) => (i === 0 ? imagesCount - 1 : i - 1))
  }

  const goToNext = () => {
    if (imagesCount <= 1) return
    setSelectedImageIndex((i) => (i === imagesCount - 1 ? 0 : i + 1))
  }

  const onTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const onTouchEnd = (e) => {
    if (touchStartX == null) return
    const endX = e.changedTouches[0].clientX
    const diff = touchStartX - endX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
    setTouchStartX(null)
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetchProductDetail(siteConfig.siteSlug, id).then((res) => {
      if (!res) {
        setError('Товар не найден')
        setData(null)
      } else {
        setData(res)
        if (res.product?.default_variant) {
          const dv = res.product.default_variant
          setSelectedVariant(dv.id)
          const attrs = {}
          ;(dv.attributes || []).forEach((a) => {
            attrs[a.attribute_id] = a.display_value
          })
          setSelectedAttributes(attrs)
          if (dv.locations?.length) setSelectedLocation(dv.locations[0])
        }
      }
      setLoading(false)
    })
  }, [id])

  const getCurrentVariant = () => {
    if (!data?.product) return null
    if (selectedVariant) {
      const v = data.product.variants?.find((x) => x.id === selectedVariant)
      if (v) return v
    }
    return data.product.default_variant
  }

  const handleAttributeSelect = (attributeId, value) => {
    if (!data?.product?.variants) return
    const matchingVariant = data.product.variants.find((v) =>
      v.attributes?.some(
        (a) => a.attribute_id === Number(attributeId) && a.display_value === value
      )
    )
    if (matchingVariant) {
      setSelectedVariant(matchingVariant.id)
      const attrs = {}
      ;(matchingVariant.attributes || []).forEach((a) => {
        attrs[a.attribute_id] = a.display_value
      })
      setSelectedAttributes(attrs)
      setSelectedLocation(
        matchingVariant.locations?.length ? matchingVariant.locations[0] : null
      )
      setShowAllStores(false)
    }
  }

  const isAttributeValueAvailable = (attributeId, value) => {
    if (!data?.product?.variants) return false
    return data.product.variants.some((v) =>
      v.attributes?.some(
        (a) => a.attribute_id === Number(attributeId) && a.display_value === value
      )
    )
  }

  const formatPrice = (price) =>
    price != null ? new Intl.NumberFormat('ru-RU').format(price) : ''

  if (loading) {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.wrap}>
        <div className={styles.error}>
          <p>{error || 'Товар не найден'}</p>
          <Link to="/catalog" className={catalogStyles.backLink}>
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    )
  }

  const { product, same_products } = data
  const images = product?.images || []
  const currentImage = images[selectedImageIndex] || images[0]
  const availableAttributes = {}
  if (product?.available_attributes) {
    Object.entries(product.available_attributes).forEach(([attrName, attrData]) => {
      availableAttributes[attrData.attribute_id] = {
        name: attrName,
        values: attrData.values,
        required: attrData.required,
      }
    })
  }
  const sizeAttr = Object.entries(availableAttributes).find(
    ([_, attr]) =>
      attr.name.toLowerCase().includes('размер') || attr.name.toLowerCase().includes('size')
  )
  const currentVariant = getCurrentVariant()
  const currentLocations = currentVariant?.locations || []
  const showStores = showAllStores ? currentLocations : currentLocations.slice(0, 3)

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>

        <div className={styles.layout}>
          {/* Галерея: на мобильной — листалка с анимацией без стрелок, на десктопе — стрелки + миниатюры */}
          <div className={styles.gallery}>
            <div
              className={styles.mainImageWrap}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className={styles.galleryTrack} style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}>
                {images.length > 0 ? (
                  images.map((img, idx) => (
                    <div key={img.id || idx} className={styles.gallerySlide}>
                      <img
                        src={getImageUrl(img.image || img)}
                        alt={product.name}
                        className={styles.mainImageImg}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.gallerySlide}>
                    <div className={styles.noImage}>Нет изображения</div>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={styles.arrowPrev}
                    onClick={goToPrev}
                    aria-label="Предыдущее фото"
                  >
                    <span aria-hidden>‹</span>
                  </button>
                  <button
                    type="button"
                    className={styles.arrowNext}
                    onClick={goToNext}
                    aria-label="Следующее фото"
                  >
                    <span aria-hidden>›</span>
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className={styles.dots}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.dot} ${selectedImageIndex === idx ? styles.dotActive : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`Фото ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Информация */}
          <div className={styles.info}>
            <div className={styles.brand}>{product.business_name || ''}</div>
            <h1 className={styles.title}>{product.name}</h1>
            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            {/* Размер / атрибуты */}
            {sizeAttr && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{sizeAttr[1].name}</h3>
                <div className={styles.attrOptions}>
                  {sizeAttr[1].values.map((val) => {
                    const available = isAttributeValueAvailable(
                      Number(sizeAttr[0]),
                      val
                    )
                    const selected =
                      selectedAttributes[Number(sizeAttr[0])] === val
                    return (
                      <button
                        key={val}
                        type="button"
                        className={`${styles.attrBtn} ${selected ? styles.attrBtnActive : ''} ${!available ? styles.attrBtnDisabled : ''}`}
                        onClick={() =>
                          available && handleAttributeSelect(Number(sizeAttr[0]), val)
                        }
                        disabled={!available}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Наличие в магазинах */}
            {currentLocations.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Наличие в магазинах</h3>
                <ul className={styles.storeList}>
                  {showStores.map((loc) => (
                    <li
                      key={loc.id}
                      className={`${styles.storeItem} ${selectedLocation?.id === loc.id ? styles.storeItemActive : ''}`}
                    >
                      <div className={styles.storeInfo}>
                        <span className={styles.storeName}>{loc.name}</span>
                        {loc.quantity != null && loc.quantity > 0 && (
                          <span className={styles.storeQty}>
                            В наличии: {loc.quantity} {loc.unit_display || 'шт.'}
                          </span>
                        )}
                      </div>
                      <div className={styles.storePrice}>
                        {formatPrice(loc.price)} ₽
                      </div>
                      <button
                        type="button"
                        className={styles.storeSelect}
                        onClick={() => setSelectedLocation(loc)}
                      >
                        {selectedLocation?.id === loc.id ? '✓ Выбран' : 'Выбрать'}
                      </button>
                    </li>
                  ))}
                </ul>
                {currentLocations.length > 3 && (
                  <button
                    type="button"
                    className={styles.showMore}
                    onClick={() => setShowAllStores((v) => !v)}
                  >
                    {showAllStores ? 'Свернуть' : 'Показать больше'}
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              className={styles.addToCart}
              disabled={!currentVariant || !selectedLocation}
              onClick={() => {
                if (currentVariant && selectedLocation) {
                  // TODO: корзина
                }
              }}
            >
              Добавить в корзину
            </button>

            {/* Табы */}
            <div className={styles.tabs}>
              <div className={styles.tabHead}>
                {['specs', 'about', 'delivery'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'specs' && 'Характеристики'}
                    {tab === 'about' && 'О товаре'}
                    {tab === 'delivery' && 'Доставка'}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'specs' && (
                  <div>
                    {currentVariant?.attributes?.length ? (
                      <ul className={styles.specList}>
                        {currentVariant.attributes.map((a) => (
                          <li key={a.id}>
                            <span className={styles.specLabel}>
                              {a.attribute_name}:
                            </span>{' '}
                            {a.display_value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Характеристики не указаны</p>
                    )}
                  </div>
                )}
                {activeTab === 'about' && (
                  <p>{product.description || 'Описание отсутствует.'}</p>
                )}
                {activeTab === 'delivery' && (
                  <p>
                    Доставка и самовывоз уточняются при заказе. Возврат в течение
                    14 дней при сохранении товарного вида.
                  </p>
                )}
              </div>
            </div>

            {/* Магазин */}
            {(product.business_name || product.business_logo) && (
              <div className={styles.business}>
                {product.business_logo && (
                  <img
                    src={getImageUrl(product.business_logo)}
                    alt={product.business_name}
                    className={styles.businessLogo}
                  />
                )}
                <div>
                  <h3 className={styles.businessName}>{product.business_name}</h3>
                  {product.business_description && (
                    <p className={styles.businessDesc}>
                      {product.business_description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Похожие товары */}
        {same_products?.length > 0 && (
          <section className={styles.similar}>
            <h2 className={styles.similarTitle}>Похожие товары</h2>
            <div className={catalogStyles.grid}>
              {same_products.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className={catalogStyles.categoryCard}
                >
                  <div className={catalogStyles.imageWrapper}>
                    {getProductCardImageUrl(item) ? (
                      <img
                        src={getProductCardImageUrl(item)}
                        alt={item.name}
                        className={catalogStyles.image}
                      />
                    ) : (
                      <div className={catalogStyles.placeholder}>
                        <span className={catalogStyles.placeholderIcon}>🛒</span>
                      </div>
                    )}
                    <div className={catalogStyles.overlay} />
                  </div>
                  <div className={catalogStyles.content}>
                    <h2 className={catalogStyles.categoryName}>{item.name}</h2>
                    {item.min_price != null && (
                      <p className={catalogStyles.categoryDescription}>
                        от {formatPrice(item.min_price)} ₽
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={catalogStyles.backBlock}>
          <Link to="/catalog" className={catalogStyles.backLink}>
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  )
}
