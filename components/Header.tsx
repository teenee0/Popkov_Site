'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/about', label: 'О нас' },
    { href: '/contacts', label: 'Контакты' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImage}>
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={50}
              height={50}
              priority
            />
          </div>
          <span className={styles.logoText}>{siteConfig.name}</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
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
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Меню"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.menuIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

