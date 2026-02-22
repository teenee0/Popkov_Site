import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import styles from './Footer.module.css'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    catalog: [
      { href: '/catalog/1', label: 'Керамическая плитка' },
      { href: '/catalog/2', label: 'Керамогранит' },
      { href: '/catalog/3', label: 'Плитка для ванной' },
      { href: '/catalog/4', label: 'Плитка для кухни' },
      { href: '/catalog/5', label: 'Напольная плитка' },
    ],
    info: [
      { href: '/about', label: 'О компании' },
      { href: '/delivery', label: 'Доставка' },
      { href: '/payment', label: 'Оплата' },
      { href: '/contacts', label: 'Контакты' },
    ],
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.company}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoImage}>
                {!logoError ? (
                  <img
                    src="/images/logo.png"
                    alt={siteConfig.name}
                    width={50}
                    height={50}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className={styles.logoFallback}>{siteConfig.name.charAt(0)}</span>
                )}
              </div>
              <span className={styles.logoText}>{siteConfig.name}</span>
            </Link>
            <p className={styles.description}>{siteConfig.description}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Каталог</h3>
              <ul className={styles.linkList}>
                {footerLinks.catalog.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Информация</h3>
              <ul className={styles.linkList}>
                {footerLinks.info.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.contacts}>
              <h3 className={styles.linkTitle}>Контакты</h3>
              <ul className={styles.contactList}>
                <li>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                    {siteConfig.phone}
                  </a>
                </li>
                <li className={styles.address}>{siteConfig.address}</li>
              </ul>
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
              {siteConfig.social.vk ? (
                <div className={styles.social}>
                  <a href={siteConfig.social.vk} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="ВКонтакте">
                    VK
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {siteConfig.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
