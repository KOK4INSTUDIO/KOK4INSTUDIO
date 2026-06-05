<template>
  <div class="mx-auto max-w-xl py-16">
    <div class="kok4-card p-6">
      <div class="text-lg font-semibold">Halaman tidak ditemukan</div>
      <p class="mt-1 text-sm text-slate-500">
        Link yang kamu buka tidak tersedia. Silakan kembali ke halaman utama.
      </p>
      <div class="mt-5 flex flex-wrap gap-2">
        <RouterLink
          to="/"
          class="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Kembali ke Website
        </RouterLink>
        <RouterLink
          to="/admin/dashboard"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Ke Admin Dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

