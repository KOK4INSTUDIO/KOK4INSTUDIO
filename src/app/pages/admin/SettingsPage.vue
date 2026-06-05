<template>
  <div class="space-y-6">
    <div>
      <div class="text-lg font-semibold">Settings</div>
      <div class="text-sm text-slate-500">
        Branding, logo, favicon, SEO title/description, dan brand information.
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="kok4-card p-4 space-y-4">
        <div class="text-sm font-semibold">Branding</div>
        <BaseInput v-model="form.brandName" label="Brand Name" />
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <BaseSelect v-model="form.logoMediaId" label="Logo (from Media)" :options="mediaOptions" placeholder="Pilih logo" />
            <div v-if="logoUrl" class="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-2">
              <img :src="logoUrl" alt="logo" class="h-14 object-contain" />
            </div>
          </div>
          <div>
            <BaseSelect v-model="form.faviconMediaId" label="Favicon (from Media)" :options="mediaOptions" placeholder="Pilih favicon" />
            <div v-if="faviconUrl" class="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-2">
              <img :src="faviconUrl" alt="favicon" class="h-14 object-contain" />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton :loading="saving" @click="saveBranding">Save Branding</BaseButton>
        </div>
      </div>

      <div class="kok4-card p-4 space-y-4">
        <div class="text-sm font-semibold">SEO</div>
        <BaseInput v-model="form.seoTitle" label="SEO Title" />
        <BaseTextarea v-model="form.seoDescription" label="SEO Description" :rows="4" />
        <div class="flex justify-end">
          <BaseButton :loading="saving" @click="saveSeo">Save SEO</BaseButton>
        </div>
      </div>
    </div>

    <div class="kok4-card p-4 space-y-4">
      <div class="text-sm font-semibold">Brand Information</div>
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.email" label="Email" placeholder="hello@kok4instudio.com" />
        <BaseInput v-model="form.phone" label="Phone" placeholder="+62..." />
        <BaseInput v-model="form.address" label="Address" placeholder="Jakarta, Indonesia" />
      </div>
      <BaseTextarea v-model="form.about" label="About" :rows="5" placeholder="Deskripsi brand..." />
      <div class="flex justify-end">
        <BaseButton :loading="saving" @click="saveBrandInfo">Save Brand Info</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseSelect from '../../components/ui/BaseSelect.vue'
import BaseTextarea from '../../components/ui/BaseTextarea.vue'
import { useMediaStore } from '../../stores/media'
import { useSettingsStore } from '../../stores/settings'
import { useToastStore } from '../../stores/toast'

const settingsStore = useSettingsStore()
const mediaStore = useMediaStore()
const toast = useToastStore()

const form = reactive({
  brandName: settingsStore.settings.branding.brandName,
  logoMediaId: settingsStore.settings.branding.logoMediaId,
  faviconMediaId: settingsStore.settings.branding.faviconMediaId,
  seoTitle: settingsStore.settings.seo.title,
  seoDescription: settingsStore.settings.seo.description,
  address: settingsStore.settings.brandInfo.address,
  email: settingsStore.settings.brandInfo.email,
  phone: settingsStore.settings.brandInfo.phone,
  about: settingsStore.settings.brandInfo.about
})

const mediaOptions = computed(() => [
  { label: '—', value: '' },
  ...mediaStore.items.map((m) => ({ label: m.name, value: m.id }))
])

const logoUrl = computed(() => mediaStore.byId.get(form.logoMediaId)?.dataUrl || '')
const faviconUrl = computed(() => mediaStore.byId.get(form.faviconMediaId)?.dataUrl || '')

const saving = ref(false)

async function saveBranding() {
  saving.value = true
  try {
    settingsStore.updateBranding({
      brandName: form.brandName.trim() || 'KOK4INSTUDIO™',
      logoMediaId: form.logoMediaId,
      faviconMediaId: form.faviconMediaId
    })
    toast.success('Branding disimpan.')
  } finally {
    saving.value = false
  }
}

async function saveSeo() {
  saving.value = true
  try {
    settingsStore.updateSeo({
      title: form.seoTitle.trim(),
      description: form.seoDescription.trim()
    })
    toast.success('SEO disimpan.')
  } finally {
    saving.value = false
  }
}

async function saveBrandInfo() {
  saving.value = true
  try {
    settingsStore.updateBrandInfo({
      address: form.address.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      about: form.about.trim()
    })
    toast.success('Brand info disimpan.')
  } finally {
    saving.value = false
  }
}
</script>
