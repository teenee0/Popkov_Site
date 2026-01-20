import { apiConfig, getApiUrl } from '@/config/api'
import { apiLogger } from './api-logger'

/**
 * Типы для API ответов
 */
export interface Category {
  id: number
  name: string
  description: string | null
  big_image: string | null
  small_image: string | null
  page_identificator: string | null
  ordering: number
  is_active: boolean
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/**
 * Базовый класс для работы с API
 */
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Если endpoint уже полный URL, используем его напрямую, иначе добавляем baseUrl
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
    
    const method = options.method || 'GET'
    const startTime = Date.now()

    // Определяем Origin и Referer для CORS
    // На сервере (SSR) используем домен сайта
    const isServer = typeof window === 'undefined'
    const origin = isServer 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'http://qwertysb.beget.tech'
      : window.location.origin
    const referer = isServer
      ? process.env.NEXT_PUBLIC_SITE_URL || 'http://qwertysb.beget.tech'
      : window.location.href

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
        'Referer': referer,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, {
        ...config,
        signal: AbortSignal.timeout(apiConfig.timeout),
      })

      const responseTime = Date.now() - startTime
      const responseSize = response.headers.get('content-length')
        ? parseInt(response.headers.get('content-length') || '0', 10)
        : undefined

      // Логируем успешный запрос
      apiLogger.logRequest(
        method,
        url,
        response.status,
        response.statusText,
        responseTime,
        undefined,
        responseSize,
        origin,
        referer
      )

      if (!response.ok) {
        const errorMessage = `API Error: ${response.status} ${response.statusText}`
        // Логируем ошибку
        apiLogger.logRequest(
          method,
          url,
          response.status,
          response.statusText,
          responseTime,
          errorMessage,
          responseSize,
          origin,
          referer
        )
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data
    } catch (error) {
      const responseTime = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : 'Unknown API error'
      
      // Логируем ошибку запроса
      apiLogger.logRequest(
        method,
        url,
        undefined,
        undefined,
        responseTime,
        errorMessage,
        undefined,
        origin,
        referer
      )

      if (error instanceof Error) {
        console.error(`API request failed: ${errorMessage}`)
        throw error
      }
      throw new Error('Unknown API error')
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }
    return this.request<T>(url, { method: 'GET' })
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Создаем экземпляр клиента
export const apiClient = new ApiClient(apiConfig.baseUrl)

/**
 * API функции для работы с категориями
 */
export const categoriesApi = {
  /**
   * Получить все категории
   * API возвращает массив категорий напрямую
   * Использует правильный URL в зависимости от окружения (dev: 8000, prod: api.vendorvillage.store)
   */
  getAll: async (params?: Record<string, string>): Promise<Category[]> => {
    return apiClient.get<Category[]>(getApiUrl('categories'), params)
  },

  /**
   * Получить категорию по ID
   * Использует правильный URL в зависимости от окружения (dev: 8000, prod: api.vendorvillage.store)
   */
  getById: async (id: number): Promise<Category> => {
    return apiClient.get<Category>(`${getApiUrl('categories')}${id}/`)
  },
}

/**
 * API функции для работы с товарами
 */
export const productsApi = {
  /**
   * Получить все товары
   */
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<unknown>> => {
    return apiClient.get<ApiResponse<unknown>>(
      getApiUrl('products'),
      params
    )
  },

  /**
   * Получить товар по ID
   */
  getById: async (id: number): Promise<unknown> => {
    return apiClient.get<unknown>(`${getApiUrl('products')}${id}/`)
  },
}

