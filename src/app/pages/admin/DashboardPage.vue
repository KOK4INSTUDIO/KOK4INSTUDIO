<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="text-lg font-semibold">Dashboard</div>
        <div class="text-sm text-slate-500">Ringkasan cepat & aksi penting untuk admin.</div>
      </div>

      <div class="flex flex-wrap gap-2">
        <RouterLink to="/admin/products" class="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          + Add Product
        </RouterLink>
        <RouterLink to="/admin/media" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
          Upload Media
        </RouterLink>
      </div>
    </div>

    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="kok4-card p-4">
        <div class="text-xs font-medium text-slate-500">Total Products</div>
        <div class="mt-2 text-2xl font-bold">{{ productsStore.totalCount }}</div>
      </div>
      <div class="kok4-card p-4">
        <div class="text-xs font-medium text-slate-500">Active Products</div>
        <div class="mt-2 text-2xl font-bold">{{ productsStore.activeCount }}</div>
      </div>
      <div class="kok4-card p-4">
        <div class="text-xs font-medium text-slate-500">Categories</div>
        <div class="mt-2 text-2xl font-bold">{{ categoriesStore.categories.length }}</div>
      </div>
      <div class="kok4-card p-4">
        <div class="text-xs font-medium text-slate-500">Pre-Orders (New)</div>
        <div class="mt-2 text-2xl font-bold">{{ preOrdersStore.newCount }}</div>
      </div>
    </section>

    <section class="kok4-card p-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="text-sm font-semibold">Recently Added Products</div>
          <div class="text-xs text-slate-500">5 produk terakhir yang ditambahkan.</div>
        </div>
        <RouterLink to="/admin/products" class="text-sm font-semibold text-brand-700 hover:underline">
          View all
        </RouterLink>
      </div>

      <div v-if="productsStore.recent.length === 0" class="mt-4">
        <EmptyState title="Belum ada produk" description="Tambahkan produk untuk mulai mengelola katalog.">
          <template #action>
            <RouterLink to="/admin/products" class="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
              + Add Product
            </RouterLink>
          </template>
        </EmptyState>
      </div>

      <div v-else class="mt-4 space-y-2">
        <div
          v-for="p in productsStore.recent"
          :key="p.id"
          class="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="min-w-0">
            <div class="truncate text-sm font-semibold">{{ p.name }}</div>
            <div class="mt-0.5 text-xs text-slate-500">
              Rp {{ formatPrice(p.price) }} • {{ categoryName(p.categoryId) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <BaseBadge :variant="p.status === 'active' ? 'success' : p.status === 'archived' ? 'warning' : 'default'">
              {{ p.status }}
            </BaseBadge>
            <RouterLink
              :to="{ name: 'admin-products' }"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Manage
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import { useCategoriesStore } from '../../stores/categories'
import { usePreOrdersStore } from '../../stores/preorders'
import { useProductsStore } from '../../stores/products'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const preOrdersStore = usePreOrdersStore()

function categoryName(categoryId) {
  return categoriesStore.byId.get(categoryId)?.name || 'Uncategorized'
}

function formatPrice(value) {
  const n = Number(value || 0)
  return n.toLocaleString('id-ID')
}
</script>
