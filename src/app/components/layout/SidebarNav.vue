<template>
  <aside
    class="fixed inset-y-0 left-0 w-72 border-r border-slate-100 bg-white shadow-soft transition-[transform,width] duration-200 lg:static lg:translate-x-0"
    :class="[
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      collapsed ? 'lg:w-20' : 'lg:w-72'
    ]"
  >
    <div class="flex h-full flex-col">
      <div class="flex items-center justify-between gap-2 px-4 py-4">
        <RouterLink to="/admin/dashboard" class="flex items-center gap-2">
          <div class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
            <span class="text-sm font-extrabold leading-none">K4</span>
          </div>
          <div v-if="!collapsed" class="min-w-0">
            <div class="truncate text-sm font-semibold leading-5">KOK4INSTUDIO™</div>
            <div class="truncate text-xs text-slate-500">Admin Dashboard</div>
          </div>
        </RouterLink>

        <div class="flex items-center gap-2">
          <button
            class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
            type="button"
            @click="$emit('close-mobile')"
            aria-label="Close sidebar"
          >
            <X class="h-4 w-4" />
          </button>

          <button
            class="hidden items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-50 lg:inline-flex"
            type="button"
            @click="$emit('toggle-collapsed')"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <ChevronRight v-if="collapsed" class="h-4 w-4" />
            <ChevronLeft v-else class="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-2 pb-4">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              :class="isActive(item.to) ? 'bg-slate-50 text-slate-900 ring-1 ring-slate-100' : ''"
              @click="$emit('close-mobile')"
            >
              <component :is="item.icon" class="h-4 w-4 text-slate-500 group-hover:text-slate-700" />
              <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="border-t border-slate-100 p-3">
        <RouterLink
          to="/admin/settings"
          class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          @click="$emit('close-mobile')"
        >
          <Settings class="h-4 w-4 text-slate-500" />
          <span v-if="!collapsed">Settings</span>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  ChevronLeft,
  ChevronRight,
  Images,
  LayoutDashboard,
  Package,
  Settings,
  Share2,
  ShoppingCart,
  Store,
  Tags,
  X
} from '@lucide/vue'

defineProps({
  collapsed: { type: Boolean, default: false },
  mobileOpen: { type: Boolean, default: false }
})

defineEmits(['close-mobile', 'toggle-collapsed'])

const route = useRoute()

const navItems = computed(() => [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Categories', to: '/admin/categories', icon: Tags },
  { label: 'Media Library', to: '/admin/media', icon: Images },
  { label: 'Pre-Orders', to: '/admin/pre-orders', icon: ShoppingCart },
  { label: 'Marketplace', to: '/admin/marketplace', icon: Store },
  { label: 'Social Media', to: '/admin/social-media', icon: Share2 }
])

function isActive(path) {
  return route.path === path
}
</script>

