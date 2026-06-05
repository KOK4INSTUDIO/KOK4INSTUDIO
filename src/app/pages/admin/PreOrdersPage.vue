<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="text-lg font-semibold">Pre-Orders</div>
        <div class="text-sm text-slate-500">Tracking inquiry customer dari WhatsApp (bukan pembayaran).</div>
      </div>
      <BaseButton @click="openCreate">+ Add Inquiry</BaseButton>
    </div>

    <div class="kok4-card p-4">
      <div v-if="store.inquiries.length === 0">
        <EmptyState title="Belum ada inquiry" description="Catat pre-order dari WhatsApp agar mudah tracking status.">
          <template #action>
            <BaseButton @click="openCreate">+ Add Inquiry</BaseButton>
          </template>
        </EmptyState>
      </div>
      <div v-else>
        <DataTable :columns="columns" :rows="store.inquiries" row-key="id">
          <template #cell:productId="{ value }">{{ productName(value) }}</template>
          <template #cell:status="{ value }">
            <BaseBadge :variant="statusVariant(value)">{{ value }}</BaseBadge>
          </template>
          <template #actions="{ row }">
            <div class="flex justify-end gap-2">
              <BaseButton variant="secondary" size="sm" @click="openEdit(row)">Edit</BaseButton>
              <BaseButton variant="danger" size="sm" @click="onDelete(row)">Delete</BaseButton>
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <BaseModal :open="modalOpen" :title="editingId ? 'Edit Inquiry' : 'Add Inquiry'" @close="closeModal">
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput v-model="form.customerName" label="Customer Name" required />
        <BaseInput v-model="form.phone" label="Phone (WhatsApp)" placeholder="628xxxxxxxxxx" />
        <BaseSelect v-model="form.productId" label="Selected Product" :options="productOptions" placeholder="Pilih produk" />
        <BaseInput v-model="form.date" label="Date" type="date" />
        <BaseSelect v-model="form.status" label="Order Status" :options="statusOptions" />
      </div>

      <div class="mt-4">
        <BaseTextarea v-model="form.notes" label="Notes (opsional)" placeholder="Catatan singkat..." />
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
import { computed, reactive, ref } from 'vue'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import BaseSelect from '../../components/ui/BaseSelect.vue'
import BaseTextarea from '../../components/ui/BaseTextarea.vue'
import DataTable from '../../components/ui/DataTable.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import { useConfirmStore } from '../../stores/confirm'
import { useToastStore } from '../../stores/toast'
import { PREORDER_STATUS, usePreOrdersStore } from '../../stores/preorders'
import { useProductsStore } from '../../stores/products'

const store = usePreOrdersStore()
const productsStore = useProductsStore()
const toast = useToastStore()
const confirm = useConfirmStore()

const columns = [
  { key: 'customerName', label: 'Customer' },
  { key: 'phone', label: 'Phone' },
  { key: 'productId', label: 'Product' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' }
]

const productOptions = computed(() => [
  { label: '—', value: '' },
  ...productsStore.products.map((p) => ({ label: p.name, value: p.id }))
])

const statusOptions = [
  { label: 'New', value: PREORDER_STATUS.NEW },
  { label: 'In progress', value: PREORDER_STATUS.IN_PROGRESS },
  { label: 'Completed', value: PREORDER_STATUS.COMPLETED },
  { label: 'Canceled', value: PREORDER_STATUS.CANCELED }
]

function statusVariant(status) {
  if (status === PREORDER_STATUS.NEW) return 'info'
  if (status === PREORDER_STATUS.IN_PROGRESS) return 'warning'
  if (status === PREORDER_STATUS.COMPLETED) return 'success'
  if (status === PREORDER_STATUS.CANCELED) return 'danger'
  return 'default'
}

function productName(id) {
  return productsStore.products.find((p) => p.id === id)?.name || '—'
}

const modalOpen = ref(false)
const editingId = ref('')
const saving = ref(false)

const form = reactive({
  customerName: '',
  phone: '',
  productId: '',
  date: new Date().toISOString().slice(0, 10),
  status: PREORDER_STATUS.NEW,
  notes: ''
})

function resetForm() {
  form.customerName = ''
  form.phone = ''
  form.productId = ''
  form.date = new Date().toISOString().slice(0, 10)
  form.status = PREORDER_STATUS.NEW
  form.notes = ''
}

function openCreate() {
  editingId.value = ''
  resetForm()
  modalOpen.value = true
}

function openEdit(row) {
  editingId.value = row.id
  form.customerName = row.customerName || ''
  form.phone = row.phone || ''
  form.productId = row.productId || ''
  form.date = row.date || new Date().toISOString().slice(0, 10)
  form.status = row.status || PREORDER_STATUS.NEW
  form.notes = row.notes || ''
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function save() {
  if (!form.customerName.trim()) {
    toast.error('Customer name wajib diisi.')
    return
  }
  saving.value = true
  try {
    const payload = {
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      productId: form.productId,
      date: form.date,
      status: form.status,
      notes: form.notes.trim()
    }
    if (editingId.value) store.update(editingId.value, payload)
    else store.create(payload)
    toast.success('Inquiry berhasil disimpan.')
    closeModal()
  } finally {
    saving.value = false
  }
}

async function onDelete(row) {
  const ok = await confirm.request({
    title: 'Hapus inquiry?',
    message: `Inquiry dari "${row.customerName}" akan dihapus.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!ok) return
  store.remove(row.id)
  toast.success('Inquiry berhasil dihapus.')
}
</script>
