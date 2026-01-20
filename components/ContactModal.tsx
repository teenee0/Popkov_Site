'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/config/site'
import styles from './ContactModal.module.css'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const phoneNumber = siteConfig.phone.replace(/\s/g, '').replace(/[()-]/g, '')

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <h2 className={styles.title}>Связаться с нами</h2>
        <p className={styles.subtitle}>Выберите удобный способ связи</p>
        <div className={styles.contactOptions}>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactButton}
            onClick={onClose}
          >
            <span className={styles.icon}>💬</span>
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>WhatsApp</span>
              <span className={styles.buttonSubtitle}>Написать в WhatsApp</span>
            </div>
          </a>
          <a
            href={siteConfig.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactButton}
            onClick={onClose}
          >
            <span className={styles.icon}>✈️</span>
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Telegram</span>
              <span className={styles.buttonSubtitle}>Написать в Telegram</span>
            </div>
          </a>
          <a
            href={`tel:${phoneNumber}`}
            className={styles.contactButton}
            onClick={onClose}
          >
            <span className={styles.icon}>📞</span>
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Позвонить</span>
              <span className={styles.buttonSubtitle}>{siteConfig.phone}</span>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

