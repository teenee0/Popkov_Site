import { siteConfig } from '@/config/site'
import styles from './Delivery.module.css'

export default function Delivery() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Доставка</h1>
        <div className={styles.content}>
          <p>
            Доставка по {siteConfig.city} и области. Уточняйте стоимость и сроки по телефону{' '}
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.link}>
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
