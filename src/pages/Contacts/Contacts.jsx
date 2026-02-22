import { siteConfig } from '@/config/site'
import styles from './Contacts.module.css'
import modalStyles from '@/components/ContactModal/ContactModal.module.css'

export default function Contacts() {
  const phoneNumber = siteConfig.phone.replace(/\s/g, '').replace(/[()-]/g, '')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.subtitleLead}>Выберите удобный способ связи</p>
        <div className={modalStyles.contactOptions}>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={modalStyles.contactButton}
          >
            <span className={modalStyles.icon}>💬</span>
            <div className={modalStyles.buttonContent}>
              <span className={modalStyles.buttonTitle}>WhatsApp</span>
              <span className={modalStyles.buttonSubtitle}>Написать в WhatsApp</span>
            </div>
          </a>
          <a href={`tel:${phoneNumber}`} className={modalStyles.contactButton}>
            <span className={modalStyles.icon}>📞</span>
            <div className={modalStyles.buttonContent}>
              <span className={modalStyles.buttonTitle}>Позвонить</span>
              <span className={modalStyles.buttonSubtitle}>{siteConfig.phone}</span>
            </div>
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Адрес</h2>
            <p className={styles.text}>{siteConfig.address}</p>
            <div className={styles.mapWidget}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=69.379694%2C53.290468&mode=poi&poi%5Bpoint%5D=69.379407%2C53.290435&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D206482115489&utm_source=share&z=19.47"
                width="100%"
                height="360"
                frameBorder="1"
                allowFullScreen
                title="Яндекс Карта — Кафель & Ламинат"
                style={{ display: 'block' }}
              />
            </div>
            <div className={styles.mapLinks}>
              <a
                href="https://yandex.ru/maps/-/CPa366mG"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Яндекс Карты
              </a>
              <a
                href="https://go.2gis.com/Zzsv8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                2ГИС
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
