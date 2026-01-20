import { siteConfig } from '@/config/site'

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Центральный рынок, ул. Ахмета Байтурсынова, 34а, 1 этаж',
      addressLocality: siteConfig.city,
      addressCountry: 'KZ',
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.url,
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

