<template>
  <div class="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
    <div class="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm">
      <component :is="icon" v-if="icon" class="h-5 w-5 text-slate-500" />
      <slot v-else name="icon" />
    </div>
    <div class="mt-3 text-sm font-semibold">{{ title }}</div>
    <div v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</div>
    <div v-if="$slots.action" class="mt-4 flex justify-center">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Tidak ada data' },
  description: { type: String, default: '' },
  icon: { type: [Object, Function], default: null }
})
</script>

