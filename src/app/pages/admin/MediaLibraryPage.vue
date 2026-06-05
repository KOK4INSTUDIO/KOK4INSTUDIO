<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="text-lg font-semibold">Media Library</div>
        <div class="text-sm text-slate-500">Upload, preview, delete, search, drag-drop, dan copy URL (data URL).</div>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="secondary" :disabled="mediaStore.items.length === 0" @click="clearAll">
          Clear All
        </BaseButton>
      </div>
    </div>

    <div class="kok4-card p-4 space-y-4">
      <FileDropzone
        title="Upload images"
        description="Drag & drop file gambar, atau klik Choose files."
        @files="onFiles"
      />

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <BaseInput v-model="q" label="Search" placeholder="Cari nama file..." />
        <div class="kok4-card border border-slate-100 bg-slate-50 p-3">
          <div class="text-xs font-semibold text-slate-600">Status</div>
          <div class="mt-1 text-sm text-slate-700">
            <span v-if="mediaStore.uploading" class="font-semibold text-brand-700">Uploading...</span>
            <span v-else class="kok4-muted">{{ mediaStore.items.length }} item(s)</span>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0">
        <EmptyState
          title="Belum ada media"
          description="Upload gambar untuk digunakan sebagai gallery produk, logo, atau favicon."
        />
      </div>

      <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="m in filtered"
          :key="m.id"
          class="group overflow-hidden rounded-xl border border-slate-100 bg-white"
        >
          <button type="button" class="block w-full" @click="openPreview(m)">
            <img :src="m.dataUrl" :alt="m.name" class="h-40 w-full object-cover" loading="lazy" />
          </button>
          <div class="p-3">
            <div class="truncate text-sm font-semibold">{{ m.name }}</div>
            <div class="mt-0.5 text-xs text-slate-500">{{ formatBytes(m.size) }}</div>
            <div class="mt-3 flex flex-wrap gap-2">
              <BaseButton variant="secondary" size="sm" @click="copyUrl(m)">Copy URL</BaseButton>
              <BaseButton variant="danger" size="sm" @click="remove(m)">Delete</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModal :open="previewOpen" title="Preview" @close="previewOpen = false" size="lg">
      <div v-if="selected">
        <img :src="selected.dataUrl" :alt="selected.name" class="w-full rounded-xl border border-slate-100" />
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <div class="text-xs font-semibold text-slate-600">Name</div>
            <div class="text-sm text-slate-800">{{ selected.name }}</div>
          </div>
          <div>
            <div class="text-xs font-semibold text-slate-600">Size</div>
            <div class="text-sm text-slate-800">{{ formatBytes(selected.size) }}</div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap justify-end gap-2">
          <BaseButton variant="secondary" @click="copyUrl(selected)">Copy URL</BaseButton>
          <BaseButton variant="danger" @click="remove(selected)">Delete</BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import FileDropzone from '../../components/ui/FileDropzone.vue'
import { useConfirmStore } from '../../stores/confirm'
import { useToastStore } from '../../stores/toast'
import { useMediaStore } from '../../stores/media'

const mediaStore = useMediaStore()
const toast = useToastStore()
const confirm = useConfirmStore()

const q = ref('')

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return mediaStore.items
  return mediaStore.items.filter((m) => (m.name || '').toLowerCase().includes(query))
})

async function onFiles(files) {
  await mediaStore.addFiles(files)
  toast.success('Upload selesai.')
}

const previewOpen = ref(false)
const selected = ref(null)

function openPreview(item) {
  selected.value = item
  previewOpen.value = true
}

function formatBytes(bytes = 0) {
  const b = Number(bytes || 0)
  if (b < 1024) return `${b} B`
  const kb = b / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

async function copyUrl(item) {
  const text = item.dataUrl
  try {
    await navigator.clipboard.writeText(text)
    toast.success('URL copied.')
  } catch {
    // Fallback
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    toast.success('URL copied.')
  }
}

async function remove(item) {
  const ok = await confirm.request({
    title: 'Hapus media?',
    message: `File "${item.name}" akan dihapus.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!ok) return
  mediaStore.remove(item.id)
  toast.success('Media berhasil dihapus.')
  if (selected.value?.id === item.id) previewOpen.value = false
}

async function clearAll() {
  const ok = await confirm.request({
    title: 'Clear semua media?',
    message: 'Semua media akan dihapus dari localStorage.',
    confirmText: 'Clear',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!ok) return
  mediaStore.clearAll()
  toast.success('Media library dikosongkan.')
}
</script>
