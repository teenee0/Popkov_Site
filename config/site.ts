/**
 * Конфигурация сайта
 * Здесь можно легко изменить название компании и другие настройки
 */
export const siteConfig = {
  name: "Popkov StroiMat",
  nameShort: "StroiMat",
  description: "Магазин плитки в Кокшетау. Широкий ассортимент керамической плитки и керамогранита высокого качества",
  city: "Кокшетау",
  url: "https://popkov-stroimat.ru",
  phone: "+7 (700) 203-30-03",
  email: "info@popkov-stroimat.ru",
  address: "Центральный рынок, ул. Ахмета Байтурсынова, 34а, 1 этаж, г. Кокшетау",
  social: {
    vk: "https://vk.com/popkovstroimat",
    telegram: "https://t.me/popkovstroimat",
    whatsapp: "https://wa.me/77002033003",
  },
} as const;

export type SiteConfig = typeof siteConfig;

