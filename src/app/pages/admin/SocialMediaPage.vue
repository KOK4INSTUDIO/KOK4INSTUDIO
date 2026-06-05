<template>
  <div class="space-y-6">
    <div>
      <div class="text-lg font-semibold">Social Media</div>
      <div class="text-sm text-slate-500">Kelola Instagram, TikTok, dan WhatsApp link untuk tampil otomatis di website.</div>
    </div>

    <div class="kok4-card p-4 space-y-4">
      <div class="text-sm font-semibold">Social Links</div>
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.instagram" label="Instagram URL" placeholder="https://instagram.com/..." />
        <BaseInput v-model="form.tiktok" label="TikTok URL" placeholder="https://tiktok.com/@..." />
        <BaseInput v-model="form.whatsapp" label="WhatsApp" placeholder="https://wa.me/62xxxx atau 62xxxx" />
      </div>
      <div class="flex justify-end">
        <BaseButton :loading="saving" @click="save">Save</BaseButton>
      </div>
      <div class="text-xs text-slate-500">
        Catatan: WA link di halaman publik legacy masih hardcoded. Setelah ini saya akan hubungkan agar otomatis pakai data dari Admin.
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import { useLinksStore } from '../../stores/links'
import { useToastStore } from '../../stores/toast'

const linksStore = useLinksStore()
const toast = useToastStore()

const form = reactive({
  instagram: linksStore.links.social.instagram,
  tiktok: linksStore.links.social.tiktok,
  whatsapp: linksStore.links.social.whatsapp
})

const saving = ref(false)

function normalizeWhatsapp(value) {
  const v = value.trim()
  if (!v) return ''
  if (v.startsWith('http')) return v
  // assume nomor, hapus + dan spasi
  const digits = v.replace(/[^\d]/g, '')
  return digits ? `https://wa.me/${digits}` : v
}

async function save() {
  saving.value = true
  try {
    linksStore.updateSocial({
      instagram: form.instagram.trim(),
      tiktok: form.tiktok.trim(),
      whatsapp: normalizeWhatsapp(form.whatsapp)
    })
    toast.success('Social links disimpan.')
  } finally {
    saving.value = false
  }
}
</script>
