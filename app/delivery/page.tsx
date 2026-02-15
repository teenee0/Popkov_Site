import { siteConfig } from '@/config/site'
import styles from './page.module.css'

export const metadata = {
  title: 'Доставка',
  description: `Условия доставки плитки в ${siteConfig.city}. ${siteConfig.name}`,
}

export default function DeliveryPage() {
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
