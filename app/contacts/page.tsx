import { siteConfig } from '@/config/site'
import styles from './page.module.css'

export const metadata = {
  title: 'Контакты',
  description: `Контакты ${siteConfig.name} — адрес, телефон. Плитка в ${siteConfig.city}`,
}

export default function ContactsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.content}>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Адрес</h2>
            <p className={styles.text}>{siteConfig.address}</p>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Телефон</h2>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.link}>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
