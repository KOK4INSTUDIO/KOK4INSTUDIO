<template>
  <div
    class="rounded-xl border-2 border-dashed p-6 text-center transition"
    :class="dragging ? 'border-brand-300 bg-brand-50' : 'border-slate-200 bg-slate-50'"
    @dragenter.prevent="dragging = true"
    @dragover.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop.prevent="onDrop"
  >
    <div class="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm">
      <Upload class="h-5 w-5 text-slate-600" />
    </div>
    <div class="mt-3 text-sm font-semibold">{{ title }}</div>
    <div class="mt-1 text-sm text-slate-500">{{ description }}</div>
    <div class="mt-4 flex justify-center">
      <BaseButton variant="secondary" @click="pickFiles">Choose files</BaseButton>
    </div>
    <input ref="fileInput" class="hidden" type="file" :accept="accept" :multiple="multiple" @change="onPick" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@lucide/vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  title: { type: String, default: 'Upload images' },
  description: { type: String, default: 'Drag & drop atau pilih file dari perangkat.' },
  accept: { type: String, default: 'image/*' },
  multiple: { type: Boolean, default: true }
})

const emit = defineEmits(['files'])

const dragging = ref(false)
const fileInput = ref()

function pickFiles() {
  fileInput.value?.click()
}

function toFileList(value) {
  if (!value) return []
  return Array.from(value)
}

function onPick(e) {
  const files = toFileList(e.target.files)
  if (files.length) emit('files', files)
  e.target.value = ''
}

function onDrop(e) {
  dragging.value = false
  const files = toFileList(e.dataTransfer?.files)
  if (files.length) emit('files', files)
}
</script>

