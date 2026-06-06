<template>
  <div class="overflow-x-auto rounded-xl border border-slate-100">
    <table class="min-w-full divide-y divide-slate-100 bg-white text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-slate-600"
            :class="col.align === 'right' ? 'text-right' : ''"
          >
            {{ col.label }}
          </th>
          <th v-if="$slots.actions" class="px-4 py-3 text-right text-xs font-semibold text-slate-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="row in rows" :key="rowKey ? row[rowKey] : JSON.stringify(row)">
          <td
            v-for="col in columns"
            :key="col.key"
            class="whitespace-nowrap px-4 py-3 text-slate-700"
            :class="col.align === 'right' ? 'text-right' : ''"
          >
            <slot :name="`cell:${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="whitespace-nowrap px-4 py-3 text-right">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' }
})
</script>

