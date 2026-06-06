import { computed } from 'vue'
import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'
import { uid } from '../utils/id'

const STORAGE_KEY = 'kok4_admin_categories_v1'

const seed = [
  { id: 'cat_accessories', name: 'Accessories', slug: 'accessories', enabled: true, createdAt: new Date().toISOString() },
  { id: 'cat_apparel', name: 'Apparel', slug: 'apparel', enabled: true, createdAt: new Date().toISOString() }
]

export const useCategoriesStore = defineStore('categories', () => {
  const categories = usePersistedState(STORAGE_KEY, seed)

  const enabledCategories = computed(() => categories.value.filter((c) => c.enabled))
  const byId = computed(() => new Map(categories.value.map((c) => [c.id, c])))

  function create(payload) {
    const item = {
      id: uid(),
      name: payload.name?.trim() || 'Untitled',
      slug: payload.slug?.trim() || (payload.name || '').toLowerCase().replace(/\s+/g, '-'),
      enabled: payload.enabled ?? true,
      createdAt: new Date().toISOString()
    }
    categories.value.unshift(item)
    return item
  }

  function update(id, patch) {
    const idx = categories.value.findIndex((c) => c.id === id)
    if (idx === -1) return null
    categories.value[idx] = { ...categories.value[idx], ...patch }
    return categories.value[idx]
  }

  function remove(id) {
    categories.value = categories.value.filter((c) => c.id !== id)
  }

  function toggleEnabled(id) {
    const item = categories.value.find((c) => c.id === id)
    if (!item) return
    item.enabled = !item.enabled
  }

  return { categories, enabledCategories, byId, create, update, remove, toggleEnabled }
})

