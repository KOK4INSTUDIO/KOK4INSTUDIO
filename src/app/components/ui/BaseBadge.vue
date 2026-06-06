<template>
  <span
    class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold"
    :class="variantClass"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' } // default | success | warning | danger | info
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700'
    case 'danger':
      return 'border-rose-200 bg-rose-50 text-rose-700'
    case 'info':
      return 'border-brand-200 bg-brand-50 text-brand-700'
    case 'default':
    default:
      return 'border-slate-200 bg-slate-50 text-slate-700'
  }
})
</script>

