<template>
  <div
    class="animate-pulse rounded-lg bg-slate-100"
    :style="{ width: width, height: height }"
    aria-hidden="true"
  />
</template>

<script setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '16px' }
})
</script>

