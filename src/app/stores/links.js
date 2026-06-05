import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'

const STORAGE_KEY = 'kok4_admin_links_v1'

const seed = {
  marketplace: {
    shopee: '',
    tokopedia: ''
  },
  social: {
    instagram: '',
    tiktok: '',
    whatsapp: ''
  }
}

export const useLinksStore = defineStore('links', () => {
  const links = usePersistedState(STORAGE_KEY, seed)

  function updateMarketplace(patch) {
    links.value.marketplace = { ...links.value.marketplace, ...patch }
  }

  function updateSocial(patch) {
    links.value.social = { ...links.value.social, ...patch }
  }

  return { links, updateMarketplace, updateSocial }
})

