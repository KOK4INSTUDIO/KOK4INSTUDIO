<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60"
    :class="[variantClass, sizeClass]"
    :disabled="disabled || loading"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | danger | ghost
  size: { type: String, default: 'md' }, // sm | md | lg
  type: { type: String, default: 'button' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
    case 'danger':
      return 'bg-rose-600 text-white hover:bg-rose-700'
    case 'ghost':
      return 'bg-transparent text-slate-700 hover:bg-slate-100'
    case 'primary':
    default:
      return 'bg-brand-600 text-white hover:bg-brand-700'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2 text-xs'
    case 'lg':
      return 'px-4 py-2.5'
    case 'md':
    default:
      return 'px-3 py-2'
  }
})
</script>

