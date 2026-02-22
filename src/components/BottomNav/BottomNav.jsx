import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const navItems = [
  { href: '/', label: 'Главная', icon: HomeIcon },
  { href: '/catalog', label: 'Каталог', icon: CatalogIcon },
  { href: '/about', label: 'О нас', icon: AboutIcon },
  { href: '/contacts', label: 'Контакты', icon: ContactsIcon },
]

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function CatalogIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function AboutIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function ContactsIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Нижнее меню">
      <ul className={styles.list}>
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <NavLink
              to={href}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
              end={href === '/'}
            >
              <span className={styles.icon}>
                <Icon />
              </span>
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
