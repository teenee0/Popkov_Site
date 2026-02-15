'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import styles from './Footer.module.css'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    catalog: [
      { href: '/catalog/ceramic', label: 'Керамическая плитка' },
      { href: '/catalog/porcelain', label: 'Керамогранит' },
      { href: '/catalog/bathroom', label: 'Плитка для ванной' },
      { href: '/catalog/kitchen', label: 'Плитка для кухни' },
      { href: '/catalog/floor', label: 'Напольная плитка' },
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
            <Link href="/" className={styles.logo}>
              <div className={styles.logoImage}>
                {!logoError ? (
                  <Image
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
                    <Link href={link.href} className={styles.link}>
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
                    <Link href={link.href} className={styles.link}>
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
              {siteConfig.social.vk ? (
                <div className={styles.social}>
                  <a
                    href={siteConfig.social.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="ВКонтакте"
                  >
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

