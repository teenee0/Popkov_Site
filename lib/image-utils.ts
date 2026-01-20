import { apiConfig } from '@/config/api'

/**
 * Получить полный URL изображения из относительного пути API
 * @param imagePath - Относительный путь изображения (например: "/media/category_images/...")
 * @returns Полный URL изображения с base URL API
 */
export function getImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) {
    return null
  }

  // Если путь уже полный URL, возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Добавляем base URL API к относительному пути
  const baseUrl = apiConfig.baseUrl.replace(/\/$/, '') // Убираем trailing slash
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}` // Добавляем / если нужно

  return `${baseUrl}${path}`
}

/**
 * Получить URL изображения категории
 * Приоритет: big_image > small_image
 */
export function getCategoryImageUrl(category: {
  big_image?: string | null
  small_image?: string | null
}): string | null {
  if (category.big_image) {
    return getImageUrl(category.big_image)
  }
  if (category.small_image) {
    return getImageUrl(category.small_image)
  }
  return null
}

