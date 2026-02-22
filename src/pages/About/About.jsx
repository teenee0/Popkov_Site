import { siteConfig } from '@/config/site'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>О нас</h1>
        <div className={styles.content}>
          <p className={styles.lead}>
            {siteConfig.name} — магазин плитки и керамогранита в {siteConfig.city}.
          </p>
          <p>
            {siteConfig.description} Мы работаем с ведущими производителями и предлагаем
            широкий ассортимент для ванной, кухни, прихожей и жилых помещений.
          </p>
          <p>
            Наша команда поможет подобрать материал под ваш интерьер и бюджет.
            Доставка по городу и области.
          </p>
        </div>
      </div>
    </div>
  )
}
