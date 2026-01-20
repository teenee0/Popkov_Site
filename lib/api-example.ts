/**
 * Пример использования API
 * Этот файл можно удалить, он только для демонстрации
 */

import { categoriesApi, productsApi } from '@/lib/api'

// Пример: Получить все категории
export async function exampleGetCategories() {
  try {
    const categories = await categoriesApi.getAll()
    console.log('Категории:', categories)
    return categories
  } catch (error) {
    console.error('Ошибка при получении категорий:', error)
    throw error
  }
}

// Пример: Получить категорию по ID
export async function exampleGetCategoryById(id: number) {
  try {
    const category = await categoriesApi.getById(id)
    console.log('Категория:', category)
    return category
  } catch (error) {
    console.error('Ошибка при получении категории:', error)
    throw error
  }
}

// Пример: Получить товары с параметрами
export async function exampleGetProducts(page: number = 1, limit: number = 20) {
  try {
    const response = await productsApi.getAll({
      page: page.toString(),
      limit: limit.toString(),
    })
    console.log('Товары:', response.results)
    return response.results
  } catch (error) {
    console.error('Ошибка при получении товаров:', error)
    throw error
  }
}

