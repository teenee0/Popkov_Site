'use client'

import { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import ContactModal from '@/components/ContactModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    {
      title: 'Керамическая плитка',
      description: 'Широкий выбор керамической плитки для любых помещений',
      href: '/catalog/ceramic',
      icon: '🧱',
    },
    {
      title: 'Керамогранит',
      description: 'Прочная и долговечная плитка из керамогранита',
      href: '/catalog/porcelain',
      icon: '💎',
    },
    {
      title: 'Плитка для ванной',
      description: 'Влагостойкая плитка для ванных комнат и санузлов',
      href: '/catalog/bathroom',
      icon: '🚿',
    },
    {
      title: 'Плитка для кухни',
      description: 'Практичная и легко моющаяся плитка для кухни',
      href: '/catalog/kitchen',
      icon: '🍳',
    },
    {
      title: 'Напольная плитка',
      description: 'Износостойкая плитка для пола различных помещений',
      href: '/catalog/floor',
      icon: '⬛',
    },
    {
      title: 'Декоративная плитка',
      description: 'Эксклюзивная декоративная плитка и мозаика',
      href: '/catalog/decorative',
      icon: '✨',
    },
  ]

  const advantages = [
    {
      icon: '📦',
      title: 'Широкий ассортимент',
      description: 'Более 5000 видов плитки от ведущих производителей',
    },
    {
      icon: '🚚',
      title: 'Доставка',
      description: `Быстрая доставка по ${siteConfig.city} и области`,
    },
    {
      icon: '⭐',
      title: 'Качество',
      description: 'Только сертифицированная плитка премиум-класса',
    },
    {
      icon: '🎯',
      title: 'Опыт',
      description: `Более 15 лет на рынке плитки и отделочных материалов в ${siteConfig.city}`,
    },
  ]

  return (
    <div className={styles.home}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Плитка в {siteConfig.city}
            <span className={styles.heroTitleAccent}> качество и стиль для вашего дома</span>
          </h1>
          <p className={styles.heroDescription}>
            {siteConfig.description}. Мы предлагаем широкий выбор плитки для ванной, кухни, гостиной и других помещений по доступным ценам в {siteConfig.city}.
          </p>
          <div className={styles.heroActions}>
            <Link href="/catalog" className={styles.buttonPrimary}>
              Перейти в каталог
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={styles.buttonSecondary}
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Наши категории</h2>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.advantages}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
          <div className={styles.advantagesGrid}>
            {advantages.map((advantage, index) => (
              <div key={index} className={styles.advantageCard}>
                <div className={styles.advantageIcon}>{advantage.icon}</div>
                <h3 className={styles.advantageTitle}>{advantage.title}</h3>
                <p className={styles.advantageDescription}>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Готовы выбрать плитку?</h2>
            <p className={styles.ctaDescription}>
              Свяжитесь с нами для консультации по выбору плитки и расчета стоимости
            </p>
            <div className={styles.ctaActions}>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.buttonPrimary}>
                Позвонить: {siteConfig.phone}
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className={styles.buttonSecondary}
              >
                Написать нам
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

