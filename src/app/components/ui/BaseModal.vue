<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-slate-900/40" @click="$emit('close')" />

      <div class="absolute inset-0 overflow-y-auto p-4">
        <div class="mx-auto w-full" :class="sizeClass">
          <div class="kok4-card overflow-hidden">
            <div class="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div class="min-w-0">
                <div class="truncate text-sm font-semibold">{{ title }}</div>
                <div v-if="description" class="mt-0.5 text-xs text-slate-500">{{ description }}</div>
              </div>
              <button
                class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
                type="button"
                @click="$emit('close')"
                aria-label="Close"
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <div class="px-5 py-4">
              <slot />
            </div>

            <div v-if="$slots.footer" class="border-t border-slate-100 px-5 py-4">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  size: { type: String, default: 'md' } // sm | md | lg
})

const emit = defineEmits(['close'])

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-lg'
    case 'lg':
      return 'max-w-4xl'
    case 'md':
    default:
      return 'max-w-2xl'
  }
})

function onKeyDown(e) {
  if (e.key === 'Escape' && props.open) {
    e.preventDefault()
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>
