import { computed } from 'vue'
import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'
import { uid } from '../utils/id'

const STORAGE_KEY = 'kok4_admin_preorders_v1'

export const PREORDER_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELED: 'canceled'
}

export const usePreOrdersStore = defineStore('preorders', () => {
  const inquiries = usePersistedState(STORAGE_KEY, [])

  const newCount = computed(() => inquiries.value.filter((i) => i.status === PREORDER_STATUS.NEW).length)

  function create(payload) {
    const item = {
      id: uid(),
      customerName: payload.customerName?.trim() || '',
      phone: payload.phone?.trim() || '',
      productId: payload.productId || '',
      date: payload.date || new Date().toISOString().slice(0, 10),
      status: payload.status || PREORDER_STATUS.NEW,
      notes: payload.notes?.trim() || ''
    }
    inquiries.value.unshift(item)
    return item
  }

  function update(id, patch) {
    const idx = inquiries.value.findIndex((p) => p.id === id)
    if (idx === -1) return null
    inquiries.value[idx] = { ...inquiries.value[idx], ...patch }
    return inquiries.value[idx]
  }

  function remove(id) {
    inquiries.value = inquiries.value.filter((p) => p.id !== id)
  }

  return { inquiries, newCount, create, update, remove }
})

