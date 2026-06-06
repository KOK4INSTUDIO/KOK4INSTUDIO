<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div class="text-xs text-slate-500">
      Showing
      <span class="font-semibold text-slate-700">{{ start }}</span>
      -
      <span class="font-semibold text-slate-700">{{ end }}</span>
      of
      <span class="font-semibold text-slate-700">{{ total }}</span>
    </div>

    <div class="flex items-center gap-2">
      <BaseButton variant="secondary" size="sm" :disabled="page <= 1" @click="$emit('update:page', page - 1)">
        Prev
      </BaseButton>
      <div class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
        Page {{ page }} / {{ totalPages }}
      </div>
      <BaseButton
        variant="secondary"
        size="sm"
        :disabled="page >= totalPages"
        @click="$emit('update:page', page + 1)"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  total: { type: Number, default: 0 }
})

defineEmits(['update:page'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const start = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1))
const end = computed(() => Math.min(props.total, props.page * props.pageSize))
</script>

