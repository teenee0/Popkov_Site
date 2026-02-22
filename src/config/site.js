export const siteConfig = {
  name: 'BuildGood',
  /** Слаг бизнеса для API site_integrations (категории по этому слагу). */
  siteSlug: import.meta.env.VITE_SITE_SLUG || 'buildgood',
  city: 'Кокшетау',
  description: 'Магазин плитки и керамогранита. Широкий ассортимент, доставка, консультации.',
  url: import.meta.env.VITE_SITE_URL || 'https://example.com',
  phone: '+7 (700) 203-30-03',
  address: 'Центральный рынок, ул. Ахмета Байтурсынова, 34а, 1 этаж',
  social: { vk: '' },
}
