import { defineStore } from 'pinia'
import { usePersistedState } from '../composables/usePersistedState'

const STORAGE_KEY = 'kok4_admin_settings_v1'

const seed = {
  branding: {
    brandName: 'KOK4INSTUDIO™',
    logoMediaId: '',
    faviconMediaId: ''
  },
  seo: {
    title: 'KOK4INSTUDIO™ — Premium Eyewear & Apparel',
    description: 'Premium Eyewear & Apparel'
  },
  brandInfo: {
    address: '',
    email: '',
    phone: '',
    about: ''
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = usePersistedState(STORAGE_KEY, seed)

  function updateBranding(patch) {
    settings.value.branding = { ...settings.value.branding, ...patch }
  }

  function updateSeo(patch) {
    settings.value.seo = { ...settings.value.seo, ...patch }
  }

  function updateBrandInfo(patch) {
    settings.value.brandInfo = { ...settings.value.brandInfo, ...patch }
  }

  return { settings, updateBranding, updateSeo, updateBrandInfo }
})

