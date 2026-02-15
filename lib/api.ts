import { getApiBase, apiPaths } from '@/config/api'

/** Ответ API для одной категории (CategorySimpleSerializer) */
export interface CategoryApiItem {
  id: number
  name: string
  description: string | null
  big_image: string | null
  small_image: string | null
  page_identificator: string | null
  ordering: number
  is_active: boolean
}

/** Категория для использования в приложении */
export interface Category {
  id: number
  name: string
  description: string | null
  page_identificator: string | null
  image: string | null
  image_url: string | null
  is_active: boolean
  ordering: number
}

/** Ответ GET /marketplace/api/categories/<id>/ */
export interface CategoryWithChildrenResponse {
  category: CategoryApiItem
  children: CategoryApiItem[]
  has_all_descendants?: boolean
  should_redirect?: boolean
  redirect_to?: string
}

function mapCategoryFromApi(item: CategoryApiItem, baseUrl: string): Category {
  const imageUrl = item.big_image || item.small_image
  const fullImageUrl =
    imageUrl && !imageUrl.startsWith('http')
      ? `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
      : imageUrl

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    page_identificator: item.page_identificator,
    image: item.big_image || item.small_image,
    image_url: fullImageUrl,
    is_active: item.is_active,
    ordering: item.ordering,
  }
}

export const categoriesApi = {
  /** Список корневых категорий — GET /marketplace/api/categories/ */
  async getAll(): Promise<Category[]> {
    const base = getApiBase()
    if (!base) {
      return getMockCategories()
    }
    try {
      const url = `${base}${apiPaths.categories()}`
      const res = await fetch(url, {
        next: { revalidate: 0 },
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) return getMockCategories()
      const data: CategoryApiItem[] = await res.json()
      if (!Array.isArray(data)) return getMockCategories()
      return data
        .filter((cat) => cat.is_active)
        .sort((a, b) => a.ordering - b.ordering)
        .map((item) => mapCategoryFromApi(item, base))
    } catch {
      return getMockCategories()
    }
  },

}

/** Ответ GET /marketplace/api/categories/<id>/ — категория и дочерние (уже замаплено) */
export type CategoryWithChildrenMapped = {
  category: Category
  children: Category[]
  has_all_descendants?: boolean
  should_redirect?: boolean
  redirect_to?: string
}

/** Одна категория и её дочерние — GET /marketplace/api/categories/<id>/ (SSR) */
export async function getCategoryWithChildren(
  id: number | string
): Promise<CategoryWithChildrenMapped | null> {
  const base = getApiBase()
  if (!base) return null
  try {
    const url = `${base}${apiPaths.categoryById(id)}`
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data: CategoryWithChildrenResponse = await res.json()
    const category = mapCategoryFromApi(data.category, base)
    const children = (data.children || []).map((item) =>
      mapCategoryFromApi(item, base)
    )
    return {
      category,
      children,
      has_all_descendants: data.has_all_descendants,
      should_redirect: data.should_redirect,
      redirect_to: data.redirect_to,
    }
  } catch {
    return null
  }
}

function getMockCategories(): Category[] {
  return [
    {
      id: 1,
      name: 'Керамическая плитка',
      description: 'Широкий выбор керамической плитки для любых помещений',
      page_identificator: 'ceramic',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 1,
    },
    {
      id: 2,
      name: 'Керамогранит',
      description: 'Прочная и долговечная плитка из керамогранита',
      page_identificator: 'porcelain',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 2,
    },
    {
      id: 3,
      name: 'Плитка для ванной',
      description: 'Влагостойкая плитка для ванных комнат и санузлов',
      page_identificator: 'bathroom',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 3,
    },
    {
      id: 4,
      name: 'Плитка для кухни',
      description: 'Практичная и легко моющаяся плитка для кухни',
      page_identificator: 'kitchen',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 4,
    },
    {
      id: 5,
      name: 'Напольная плитка',
      description: 'Износостойкая плитка для пола различных помещений',
      page_identificator: 'floor',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 5,
    },
    {
      id: 6,
      name: 'Декоративная плитка',
      description: 'Эксклюзивная декоративная плитка и мозаика',
      page_identificator: 'decorative',
      image: null,
      image_url: null,
      is_active: true,
      ordering: 6,
    },
  ]
}
