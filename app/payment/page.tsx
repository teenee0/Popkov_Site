import { siteConfig } from '@/config/site'
import styles from './page.module.css'

export const metadata = {
  title: 'Оплата',
  description: `Способы оплаты. ${siteConfig.name} — плитка в ${siteConfig.city}`,
}

export default function PaymentPage() {
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
