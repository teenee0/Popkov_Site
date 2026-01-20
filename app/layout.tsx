import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Плитка в ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'плитка',
    'керамическая плитка',
    'керамогранит',
    'плитка для ванной',
    'плитка для кухни',
    'напольная плитка',
    siteConfig.city,
    `плитка в ${siteConfig.city}`,
    `магазин плитки ${siteConfig.city}`,
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} - Плитка в ${siteConfig.city}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

