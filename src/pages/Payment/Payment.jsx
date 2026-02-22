import { siteConfig } from '@/config/site'
import styles from './Payment.module.css'

export default function Payment() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Оплата</h1>
        <div className={styles.content}>
          <p>
            Оплата наличными и безналичным расчётом. Детали уточняйте по телефону{' '}
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
