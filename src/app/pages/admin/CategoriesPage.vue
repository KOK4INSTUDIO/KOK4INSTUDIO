<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="text-lg font-semibold">Categories</div>
        <div class="text-sm text-slate-500">Kelola grup produk seperti Accessories & Apparel (enable/disable, edit, delete).</div>
      </div>

      <BaseButton @click="openCreate">+ Add Category</BaseButton>
    </div>

    <div class="kok4-card p-4">
      <div v-if="categoriesStore.categories.length === 0">
        <EmptyState title="Belum ada kategori" description="Buat kategori untuk mengelompokkan produk.">
          <template #action>
            <BaseButton @click="openCreate">+ Add Category</BaseButton>
          </template>
        </EmptyState>
      </div>
      <div v-else>
        <DataTable :columns="columns" :rows="categoriesStore.categories" row-key="id">
          <template #cell:enabled="{ value }">
            <BaseBadge :variant="value ? 'success' : 'default'">{{ value ? 'enabled' : 'disabled' }}</BaseBadge>
          </template>
          <template #actions="{ row }">
            <div class="flex justify-end gap-2">
              <BaseButton variant="secondary" size="sm" @click="categoriesStore.toggleEnabled(row.id)">
                {{ row.enabled ? 'Disable' : 'Enable' }}
              </BaseButton>
              <BaseButton variant="secondary" size="sm" @click="openEdit(row)">Edit</BaseButton>
              <BaseButton variant="danger" size="sm" @click="onDelete(row)">Delete</BaseButton>
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <BaseModal :open="modalOpen" :title="editingId ? 'Edit Category' : 'Add Category'" @close="closeModal">
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.name" label="Name" required />
        <BaseInput v-model="form.slug" label="Slug" placeholder="accessories" hint="Jika kosong akan dibuat otomatis." />
      </div>
      <div class="mt-4">
        <label class="flex items-center gap-2">
          <input v-model="form.enabled" type="checkbox" class="rounded border-slate-300" />
          <span class="text-sm text-slate-700">Enabled</span>
        </label>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <BaseButton variant="secondary" @click="closeModal">Cancel</BaseButton>
          <BaseButton :loading="saving" @click="save">Save</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import { useConfirmStore } from '../../stores/confirm'
import { useToastStore } from '../../stores/toast'
import { useCategoriesStore } from '../../stores/categories'

const categoriesStore = useCategoriesStore()
const toast = useToastStore()
const confirm = useConfirmStore()

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'enabled', label: 'Status' }
]

const modalOpen = ref(false)
const editingId = ref('')
const saving = ref(false)

const form = reactive({ name: '', slug: '', enabled: true })

function resetForm() {
  form.name = ''
  form.slug = ''
  form.enabled = true
}

function openCreate() {
  editingId.value = ''
  resetForm()
  modalOpen.value = true
}

function openEdit(row) {
  editingId.value = row.id
  form.name = row.name || ''
  form.slug = row.slug || ''
  form.enabled = !!row.enabled
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function save() {
  const name = form.name.trim()
  if (!name) {
    toast.error('Nama kategori wajib diisi.')
    return
  }
  saving.value = true
  try {
    const payload = {
      name,
      slug: form.slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
      enabled: !!form.enabled
    }
    if (editingId.value) categoriesStore.update(editingId.value, payload)
    else categoriesStore.create(payload)
    toast.success('Kategori berhasil disimpan.')
    closeModal()
  } finally {
    saving.value = false
  }
}

async function onDelete(row) {
  const ok = await confirm.request({
    title: 'Hapus kategori?',
    message: `Kategori "${row.name}" akan dihapus.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!ok) return
  categoriesStore.remove(row.id)
  toast.success('Kategori berhasil dihapus.')
}
</script>
