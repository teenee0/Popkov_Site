import { apiConfig, getApiUrl } from '@/config/api'

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
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, {
        ...config,
        signal: AbortSignal.timeout(apiConfig.timeout),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        console.error(`API request failed: ${error.message}`)
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

