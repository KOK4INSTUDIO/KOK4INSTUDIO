<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="text-lg font-semibold">Products</div>
        <div class="text-sm text-slate-500">Kelola produk: nama, harga, kategori, badge, gallery, spesifikasi, status, visibility.</div>
      </div>

      <BaseButton @click="openCreate">+ Add Product</BaseButton>
    </div>

    <div class="kok4-card p-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <BaseInput v-model="q" label="Search" placeholder="Cari nama/badge..." />
          <BaseSelect
            v-model="statusFilter"
            label="Status"
            :options="statusOptions"
            placeholder="Pilih status"
          />
          <BaseSelect
            v-model="categoryFilter"
            label="Category"
            :options="categoryOptions"
            placeholder="Pilih kategori"
          />
        </div>
        <div class="flex items-center gap-2">
          <BaseButton variant="secondary" @click="resetFilter">Reset</BaseButton>
        </div>
      </div>

      <div class="mt-4">
        <EmptyState
          v-if="filtered.length === 0"
          title="Belum ada produk"
          description="Tambahkan produk untuk mulai mengelola katalog."
        >
          <template #action>
            <BaseButton @click="openCreate">+ Add Product</BaseButton>
          </template>
        </EmptyState>

        <template v-else>
          <DataTable :columns="columns" :rows="paginated" row-key="id">
            <template #cell:price="{ value }">Rp {{ formatPrice(value) }}</template>
            <template #cell:categoryId="{ value }">{{ categoryName(value) }}</template>
            <template #cell:status="{ value }">
              <BaseBadge :variant="value === 'active' ? 'success' : value === 'archived' ? 'warning' : 'default'">
                {{ value }}
              </BaseBadge>
            </template>
            <template #cell:visibility="{ value }">
              <BaseBadge :variant="value === 'public' ? 'info' : 'default'">{{ value }}</BaseBadge>
            </template>
            <template #actions="{ row }">
              <div class="flex justify-end gap-2">
                <BaseButton variant="secondary" size="sm" @click="openEdit(row)">Edit</BaseButton>
                <BaseButton variant="danger" size="sm" @click="onDelete(row)">Delete</BaseButton>
              </div>
            </template>
          </DataTable>

          <div class="mt-4">
            <PaginationBar v-model:page="page" :page-size="pageSize" :total="filtered.length" />
          </div>
        </template>
      </div>
    </div>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Edit Product' : 'Add Product'"
      description="Lengkapi informasi produk. Semua data tersimpan di browser (localStorage)."
      @close="closeModal"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.name" label="Product Name" required />
        <BaseInput v-model="form.price" label="Price" type="number" required />
        <BaseSelect v-model="form.categoryId" label="Category" :options="categoryOptionsAll" placeholder="Pilih kategori" />
        <BaseInput v-model="form.badge" label="Badge" placeholder="Best Seller / New / Limited..." />
        <BaseSelect v-model="form.status" label="Status" :options="statusOptionsAll" />
        <BaseSelect v-model="form.visibility" label="Visibility" :options="visibilityOptions" />
      </div>

      <div class="mt-4">
        <BaseTextarea v-model="form.description" label="Description" placeholder="Deskripsi singkat produk..." />
      </div>

      <div class="mt-4">
        <div class="text-sm font-semibold">Gallery Images</div>
        <div class="mt-2 grid gap-3 lg:grid-cols-2">
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div class="text-xs font-semibold text-slate-600">Select from Media Library</div>
            <div class="mt-2 max-h-56 overflow-auto">
              <div v-if="mediaStore.items.length === 0" class="text-sm text-slate-500">
                Belum ada media. Upload di menu Media Library.
              </div>
              <label
                v-for="m in mediaStore.items"
                :key="m.id"
                class="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white"
              >
                <input
                  type="checkbox"
                  class="rounded border-slate-300"
                  :checked="form.galleryMediaIds.includes(m.id)"
                  @change="toggleGallery(m.id)"
                />
                <img :src="m.dataUrl" alt="" class="h-10 w-10 rounded-lg border border-slate-100 object-cover" />
                <div class="min-w-0">
                  <div class="truncate text-sm font-medium text-slate-700">{{ m.name }}</div>
                  <div class="text-xs text-slate-500">{{ formatBytes(m.size) }}</div>
                </div>
              </label>
            </div>
          </div>
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div class="text-xs font-semibold text-slate-600">Selected</div>
            <div v-if="form.galleryMediaIds.length === 0" class="mt-2 text-sm text-slate-500">Belum memilih gambar.</div>
            <div v-else class="mt-2 flex flex-wrap gap-2">
              <div v-for="id in form.galleryMediaIds" :key="id" class="group relative">
                <img
                  :src="mediaStore.byId.get(id)?.dataUrl"
                  alt=""
                  class="h-16 w-16 rounded-xl border border-slate-100 object-cover"
                />
                <button
                  class="absolute right-1 top-1 hidden rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm group-hover:block"
                  type="button"
                  @click="removeFromGallery(id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold">Specifications</div>
          <BaseButton variant="secondary" size="sm" @click="addSpec">+ Add spec</BaseButton>
        </div>
        <div class="mt-2 space-y-2">
          <div
            v-for="(s, idx) in form.specifications"
            :key="idx"
            class="grid gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <BaseInput v-model="s.key" placeholder="Key (e.g., Material)" />
            <BaseInput v-model="s.value" placeholder="Value (e.g., Premium Acetate)" />
            <div class="flex items-center justify-end">
              <BaseButton variant="danger" size="sm" @click="removeSpec(idx)">Remove</BaseButton>
            </div>
          </div>
          <div v-if="form.specifications.length === 0" class="text-sm text-slate-500">
            Tidak ada spesifikasi. (Opsional)
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-wrap justify-end gap-2">
          <BaseButton variant="secondary" @click="closeModal">Cancel</BaseButton>
          <BaseButton :loading="saving" @click="save">Save</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import BaseSelect from '../../components/ui/BaseSelect.vue'
import BaseTextarea from '../../components/ui/BaseTextarea.vue'
import DataTable from '../../components/ui/DataTable.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import PaginationBar from '../../components/ui/PaginationBar.vue'
import { useConfirmStore } from '../../stores/confirm'
import { useToastStore } from '../../stores/toast'
import { useCategoriesStore } from '../../stores/categories'
import { PRODUCT_STATUS, PRODUCT_VISIBILITY, useProductsStore } from '../../stores/products'
import { useMediaStore } from '../../stores/media'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const mediaStore = useMediaStore()
const toast = useToastStore()
const confirm = useConfirmStore()

const q = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

const page = ref(1)
const pageSize = 10

watch([q, statusFilter, categoryFilter], () => {
  page.value = 1
})

const categoryOptionsAll = computed(() => [
  { label: 'Uncategorized', value: '' },
  ...categoriesStore.categories.map((c) => ({ label: `${c.name}${c.enabled ? '' : ' (disabled)'}`, value: c.id }))
])
const categoryOptions = computed(() => [{ label: 'All', value: '' }, ...categoryOptionsAll.value])

const statusOptionsAll = [
  { label: 'Draft', value: PRODUCT_STATUS.DRAFT },
  { label: 'Active', value: PRODUCT_STATUS.ACTIVE },
  { label: 'Archived', value: PRODUCT_STATUS.ARCHIVED }
]
const statusOptions = [{ label: 'All', value: '' }, ...statusOptionsAll]
const visibilityOptions = [
  { label: 'Public', value: PRODUCT_VISIBILITY.PUBLIC },
  { label: 'Hidden', value: PRODUCT_VISIBILITY.HIDDEN }
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'categoryId', label: 'Category' },
  { key: 'badge', label: 'Badge' },
  { key: 'status', label: 'Status' },
  { key: 'visibility', label: 'Visibility' }
]

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  return productsStore.products.filter((p) => {
    if (statusFilter.value && p.status !== statusFilter.value) return false
    if (categoryFilter.value && p.categoryId !== categoryFilter.value) return false
    if (!query) return true
    return (
      p.name?.toLowerCase().includes(query) ||
      p.badge?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    )
  })
})

const paginated = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

function resetFilter() {
  q.value = ''
  statusFilter.value = ''
  categoryFilter.value = ''
}

function categoryName(categoryId) {
  return categoriesStore.byId.get(categoryId)?.name || 'Uncategorized'
}
function formatPrice(value) {
  return Number(value || 0).toLocaleString('id-ID')
}
function formatBytes(bytes = 0) {
  const b = Number(bytes || 0)
  if (b < 1024) return `${b} B`
  const kb = b / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

// Modal + form
const modalOpen = ref(false)
const editingId = ref('')
const saving = ref(false)

const form = reactive({
  name: '',
  price: 0,
  categoryId: '',
  badge: '',
  description: '',
  galleryMediaIds: [],
  specifications: [],
  status: PRODUCT_STATUS.DRAFT,
  visibility: PRODUCT_VISIBILITY.PUBLIC
})

function resetForm() {
  form.name = ''
  form.price = 0
  form.categoryId = ''
  form.badge = ''
  form.description = ''
  form.galleryMediaIds = []
  form.specifications = []
  form.status = PRODUCT_STATUS.DRAFT
  form.visibility = PRODUCT_VISIBILITY.PUBLIC
}

function openCreate() {
  editingId.value = ''
  resetForm()
  modalOpen.value = true
}

function openEdit(row) {
  editingId.value = row.id
  form.name = row.name || ''
  form.price = row.price || 0
  form.categoryId = row.categoryId || ''
  form.badge = row.badge || ''
  form.description = row.description || ''
  form.galleryMediaIds = [...(row.galleryMediaIds || [])]
  form.specifications = [...(row.specifications || [])]
  form.status = row.status || PRODUCT_STATUS.DRAFT
  form.visibility = row.visibility || PRODUCT_VISIBILITY.PUBLIC
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function addSpec() {
  form.specifications.push({ key: '', value: '' })
}
function removeSpec(idx) {
  form.specifications.splice(idx, 1)
}

function toggleGallery(id) {
  if (form.galleryMediaIds.includes(id)) removeFromGallery(id)
  else form.galleryMediaIds.push(id)
}
function removeFromGallery(id) {
  form.galleryMediaIds = form.galleryMediaIds.filter((x) => x !== id)
}

async function save() {
  const name = form.name.trim()
  if (!name) {
    toast.error('Product name wajib diisi.')
    return
  }
  saving.value = true
  try {
    const payload = {
      name,
      price: Number(form.price || 0),
      categoryId: form.categoryId,
      badge: form.badge.trim(),
      description: form.description.trim(),
      galleryMediaIds: form.galleryMediaIds,
      specifications: form.specifications
        .map((s) => ({ key: String(s.key || '').trim(), value: String(s.value || '').trim() }))
        .filter((s) => s.key || s.value),
      status: form.status,
      visibility: form.visibility
    }

    if (editingId.value) productsStore.update(editingId.value, payload)
    else productsStore.create(payload)

    toast.success('Produk berhasil disimpan.')
    closeModal()
  } finally {
    saving.value = false
  }
}

async function onDelete(row) {
  const ok = await confirm.request({
    title: 'Hapus produk?',
    message: `Produk "${row.name}" akan dihapus permanen dari local data.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!ok) return
  productsStore.remove(row.id)
  toast.success('Produk berhasil dihapus.')
}
</script>
