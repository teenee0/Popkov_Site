/**
 * Конфигурация API
 * Использует переменные окружения для разных сред разработки
 */

const getApiBaseUrl = () => {
  // В production используем переменную окружения
  if (process.env.NEXT_PUBLIC_API_URL) {
    const url = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '') // Убираем trailing slash
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 API URL (Production):', url)
    }
    return url
  }

  // В development используем локальный сервер по умолчанию
  if (process.env.NODE_ENV === 'development') {
    const devUrl = process.env.NEXT_PUBLIC_DEV_API_URL || 'http://127.0.0.1:8000'
    const url = devUrl.replace(/\/$/, '') // Убираем trailing slash
    console.log('🔧 API URL (Development):', url)
    return url
  }

  // Fallback для production, если не указан NEXT_PUBLIC_API_URL
  console.warn('⚠️ NEXT_PUBLIC_API_URL не установлен, используется fallback URL')
  return 'http://127.0.0.1:8000'
}

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  endpoints: {
    categories: '/marketplace/api/categories/',
    products: '/marketplace/api/products/',
    // Добавьте другие эндпоинты по мере необходимости
  },
  timeout: 10000, // 10 секунд
} as const

/**
 * Получить полный URL для эндпоинта
 */
export const getApiUrl = (endpoint: keyof typeof apiConfig.endpoints): string => {
  return `${apiConfig.baseUrl}${apiConfig.endpoints[endpoint]}`
}

/**
 * Проверка доступности API
 */
export const isApiConfigured = (): boolean => {
  return !!apiConfig.baseUrl
}

