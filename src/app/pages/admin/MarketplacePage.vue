<template>
  <div class="space-y-6">
    <div>
      <div class="text-lg font-semibold">Marketplace</div>
      <div class="text-sm text-slate-500">Kelola link Shopee & Tokopedia tanpa edit source code.</div>
    </div>

    <div class="kok4-card p-4 space-y-4">
      <div class="text-sm font-semibold">Marketplace Links</div>
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.shopee" label="Shopee URL" placeholder="https://shopee.co.id/..." />
        <BaseInput v-model="form.tokopedia" label="Tokopedia URL" placeholder="https://www.tokopedia.com/..." />
      </div>
      <div class="flex justify-end">
        <BaseButton :loading="saving" @click="save">Save</BaseButton>
      </div>
      <div class="text-xs text-slate-500">
        Catatan: halaman publik legacy saat ini masih memakai link hardcoded. Setelah ini saya akan hubungkan agar membaca link dari Admin.
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
  shopee: linksStore.links.marketplace.shopee,
  tokopedia: linksStore.links.marketplace.tokopedia
})

const saving = ref(false)

async function save() {
  saving.value = true
  try {
    linksStore.updateMarketplace({
      shopee: form.shopee.trim(),
      tokopedia: form.tokopedia.trim()
    })
    toast.success('Marketplace links disimpan.')
  } finally {
    saving.value = false
  }
}
</script>
