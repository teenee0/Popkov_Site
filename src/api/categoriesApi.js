import { ENV_CONFIG } from '@/config/environment'

const API_BASE = (ENV_CONFIG.API_BASE_URL || '').replace(/\/$/, '')

/** Ручка: GET /site-integrations/api/categories/<slug>/ — дерево категорий бизнеса (массив корней, у каждого есть children). */
function mapCategory(item) {
  if (!item || item.id == null) return null
  const imageUrl = item.big_image || item.small_image || null
  const fullImageUrl =
    imageUrl && !imageUrl.startsWith('http')
      ? `${API_BASE}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
      : imageUrl
  return {
    id: item.id,
    name: item.name || '',
    description: item.description || null,
    page_identificator: item.page_identificator || null,
    image: imageUrl,
    image_url: fullImageUrl,
    is_active: item.is_active !== false,
    ordering: item.ordering ?? 0,
  }
}

/** Рекурсивный поиск категории по id в дереве (узлы с полем children). */
function findInTree(nodes, id) {
  if (!nodes || !Array.isArray(nodes)) return null
  const numId = Number(id)
  for (const node of nodes) {
    if (node.id === numId || node.id === id) return node
    const found = findInTree(node.children, id)
    if (found) return found
  }
  return null
}

/**
 * Загружает дерево категорий для сайта по слагу.
 * GET /site-integrations/api/categories/<slug>/
 * Ответ: массив корневых категорий, у каждой есть children (вложенное дерево).
 */
export async function fetchSiteCategoriesTree(slug) {
  if (!API_BASE || !slug) return []
  try {
    const res = await fetch(`${API_BASE}/site-integrations/api/categories/${encodeURIComponent(slug)}/`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

/**
 * Корневые категории для главной страницы каталога — первый уровень дерева по слагу сайта.
 */
export async function fetchRootCategories(slug) {
  const tree = await fetchSiteCategoriesTree(slug)
  return tree
    .filter((c) => c && c.is_active !== false)
    .sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0))
    .map(mapCategory)
    .filter(Boolean)
}

/**
 * Категория и её прямые дети по id (ищем в дереве по слагу).
 * Для страницы /catalog/:id.
 */
export async function fetchCategoryWithChildren(slug, id) {
  if (!slug) return null
  const tree = await fetchSiteCategoriesTree(slug)
  const node = findInTree(tree, id)
  if (!node) return null
  const category = mapCategory(node)
  const children = (node.children || [])
    .filter((c) => c && c.is_active !== false)
    .sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0))
    .map(mapCategory)
    .filter(Boolean)
  return { category, children }
}

/**
 * Товары категории для личного сайта (когда в категории нет дочерних).
 * GET /site-integrations/api/categories/<slug>/<categoryId>/products/
 */
export async function fetchCategoryProducts(slug, categoryId) {
  if (!slug || categoryId == null || !API_BASE) return []
  try {
    const res = await fetch(
      `${API_BASE}/site-integrations/api/categories/${encodeURIComponent(slug)}/${encodeURIComponent(categoryId)}/products/`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

/**
 * Детальная страница товара для личного сайта.
 * GET /site-integrations/api/products/<slug>/<productId>/
 * Ответ: { breadcrumbs, product, same_products } — как в marketplace product detail.
 */
export async function fetchProductDetail(slug, productId) {
  if (!slug || productId == null || !API_BASE) return null
  try {
    const res = await fetch(
      `${API_BASE}/site-integrations/api/products/${encodeURIComponent(slug)}/${encodeURIComponent(productId)}/`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Последние товары бизнеса для главной страницы.
 * GET /site-integrations/api/products/<slug>/?limit=N
 */
export async function fetchLatestProducts(slug, limit = 10) {
  if (!slug || !API_BASE) return []
  try {
    const res = await fetch(
      `${API_BASE}/site-integrations/api/products/${encodeURIComponent(slug)}/?limit=${limit}`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function getCategoryImageUrl(category) {
  const url = category?.image_url || category?.image
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_BASE}/${url.replace(/^\//, '')}`
}
