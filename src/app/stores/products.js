import { computed } from 'vue'
import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'
import { uid } from '../utils/id'

const STORAGE_KEY = 'kok4_admin_products_v1'

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived'
}

export const PRODUCT_VISIBILITY = {
  PUBLIC: 'public',
  HIDDEN: 'hidden'
}

export const useProductsStore = defineStore('products', () => {
  const products = usePersistedState(STORAGE_KEY, [])

  const totalCount = computed(() => products.value.length)
  const activeCount = computed(() => products.value.filter((p) => p.status === PRODUCT_STATUS.ACTIVE).length)

  const recent = computed(() =>
    [...products.value].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 5)
  )

  function create(payload) {
    const item = {
      id: uid(),
      name: payload.name?.trim() || 'Untitled product',
      price: Number(payload.price || 0),
      categoryId: payload.categoryId || '',
      badge: payload.badge?.trim() || '',
      description: payload.description?.trim() || '',
      galleryMediaIds: payload.galleryMediaIds || [],
      specifications: payload.specifications || [], // [{ key, value }]
      status: payload.status || PRODUCT_STATUS.DRAFT,
      visibility: payload.visibility || PRODUCT_VISIBILITY.PUBLIC,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    products.value.unshift(item)
    return item
  }

  function update(id, patch) {
    const idx = products.value.findIndex((p) => p.id === id)
    if (idx === -1) return null
    products.value[idx] = { ...products.value[idx], ...patch, updatedAt: new Date().toISOString() }
    return products.value[idx]
  }

  function remove(id) {
    products.value = products.value.filter((p) => p.id !== id)
  }

  return { products, totalCount, activeCount, recent, create, update, remove }
})

