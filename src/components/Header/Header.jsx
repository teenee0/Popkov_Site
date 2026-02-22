import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import styles from './Header.module.css'

export default function Header() {
  const [logoError, setLogoError] = useState(false)

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/about', label: 'О нас' },
    { href: '/contacts', label: 'Контакты' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
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

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.phone}>
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  )
}
