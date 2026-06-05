<template>
  <label class="block">
    <div v-if="label" class="mb-1 text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="text-rose-600">*</span>
    </div>

    <select
      :value="modelValue"
      class="block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition"
      :class="error ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <div v-if="error" class="mt-1 text-xs text-rose-600">{{ error }}</div>
    <div v-else-if="hint" class="mt-1 text-xs text-slate-500">{{ hint }}</div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>

