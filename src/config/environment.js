/**
 * Хост API в зависимости от окружения:
 * - Разработка (npm run dev): localhost:8000
 * - Продакшен (npm run build): https://api.vendorvillage.store
 *
 * Категории: {API_BASE_URL}/marketplace/api/categories/ и .../categories/237/
 */
const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:8000',
    MEDIA_BASE_URL: 'http://127.0.0.1:8000',
  },
  production: {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.vendorvillage.store',
    MEDIA_BASE_URL: import.meta.env.VITE_MEDIA_BASE_URL || import.meta.env.VITE_API_BASE_URL || 'https://api.vendorvillage.store',
  },
}

const currentEnv = import.meta.env.DEV ? 'development' : 'production'
export const ENV_CONFIG = { ...config[currentEnv], IS_DEV: import.meta.env.DEV }
export default ENV_CONFIG
