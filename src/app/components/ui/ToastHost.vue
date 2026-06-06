<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[60] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2">
      <div
        v-for="t in toastStore.toasts"
        :key="t.id"
        class="kok4-card flex items-start gap-3 p-4"
      >
        <div class="mt-0.5">
          <CheckCircle2 v-if="t.type === 'success'" class="h-5 w-5 text-emerald-600" />
          <XCircle v-else-if="t.type === 'error'" class="h-5 w-5 text-rose-600" />
          <AlertTriangle v-else-if="t.type === 'warning'" class="h-5 w-5 text-amber-600" />
          <Info v-else class="h-5 w-5 text-brand-600" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="text-sm font-semibold">{{ t.title }}</div>
          <div v-if="t.message" class="mt-0.5 text-sm text-slate-600">
            {{ t.message }}
          </div>
        </div>
        <button
          class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
          type="button"
          @click="toastStore.remove(t.id)"
          aria-label="Dismiss"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from '@lucide/vue'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
</script>

