<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Mobile overlay -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
      @click="mobileOpen = false"
    />

    <div class="flex">
      <SidebarNav
        class="z-50"
        :collapsed="collapsed"
        :mobile-open="mobileOpen"
        @close-mobile="mobileOpen = false"
        @toggle-collapsed="collapsed = !collapsed"
      />

      <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur">
          <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div class="flex items-center gap-2">
              <button
                class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
                type="button"
                @click="mobileOpen = true"
                aria-label="Open sidebar"
              >
                <Menu class="h-4 w-4" />
              </button>
              <div>
                <div class="text-sm font-semibold leading-5">{{ pageTitle }}</div>
                <div class="text-xs text-slate-500">KOK4INSTUDIO™ Admin</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <RouterLink
                to="/"
                class="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
              >
                View Website
              </RouterLink>
            </div>
          </div>
        </header>

        <main class="p-4 sm:p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Menu } from '@lucide/vue'
import SidebarNav from '../components/layout/SidebarNav.vue'

const route = useRoute()

const pageTitle = computed(() => route.meta?.title ?? 'Admin')

const collapsed = ref(localStorage.getItem('kok4_admin_sidebar_collapsed') === '1')
watch(collapsed, (v) => localStorage.setItem('kok4_admin_sidebar_collapsed', v ? '1' : '0'))

const mobileOpen = ref(false)
</script>

