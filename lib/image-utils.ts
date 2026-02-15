import type { Category } from './api'
import { getApiBase } from '@/config/api'

export function getCategoryImageUrl(category: Category): string | null {
  const url = category.image_url || category.image
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = getApiBase().replace(/\/$/, '')
  return `${base}/${url.replace(/^\//, '')}`
}
