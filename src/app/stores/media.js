import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'
import { uid } from '../utils/id'

const STORAGE_KEY = 'kok4_admin_media_v1'

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

export const useMediaStore = defineStore('media', () => {
  const items = usePersistedState(STORAGE_KEY, [])
  const uploading = ref(false)

  const byId = computed(() => new Map(items.value.map((m) => [m.id, m])))

  async function addFiles(files = []) {
    uploading.value = true
    try {
      for (const file of files) {
        const dataUrl = await readAsDataUrl(file)
        items.value.unshift({
          id: uid(),
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl,
          createdAt: new Date().toISOString()
        })
      }
    } finally {
      uploading.value = false
    }
  }

  function remove(id) {
    items.value = items.value.filter((m) => m.id !== id)
  }

  function clearAll() {
    items.value = []
  }

  return { items, uploading, byId, addFiles, remove, clearAll }
})

