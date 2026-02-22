/**
 * Базовый URL API.
 * Задаётся через переменные окружения отдельно для разработки и продакшена:
 *
 * - Разработка: создайте .env.development с API_URL=http://127.0.0.1:8000
 * - Продакшен: создайте .env.production с API_URL=https://ваш-хост-api.com
 *
 * Next.js подставляет .env.development при npm run dev и .env.production при npm run build/start.
 */
export function getApiBase(): string {
  const base = process.env.API_URL ?? ''
  return base.replace(/\/$/, '')
}

export const apiPaths = {
  categories: () => '/marketplace/api/categories/',
  categoryById: (id: number | string) => `/marketplace/api/categories/${id}/`,
  categoryProducts: (id: number | string) => `/marketplace/api/categories/${id}/products/`,
} as const