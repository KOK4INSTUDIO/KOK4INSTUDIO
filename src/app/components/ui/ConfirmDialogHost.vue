<template>
  <Teleport to="body">
    <div v-if="store.open" class="fixed inset-0 z-[70]">
      <div class="absolute inset-0 bg-slate-900/40" @click="store.cancel()" />
      <div class="absolute inset-0 grid place-items-center p-4">
        <div class="kok4-card w-full max-w-lg p-5">
          <div class="text-sm font-semibold">{{ store.title }}</div>
          <div v-if="store.message" class="mt-1 text-sm text-slate-600">{{ store.message }}</div>
          <div class="mt-5 flex flex-wrap justify-end gap-2">
            <BaseButton variant="secondary" @click="store.cancel()">{{ store.cancelText }}</BaseButton>
            <BaseButton :variant="store.variant" @click="store.confirm()">{{ store.confirmText }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useConfirmStore } from '../../stores/confirm'
import BaseButton from './BaseButton.vue'

const store = useConfirmStore()
</script>

