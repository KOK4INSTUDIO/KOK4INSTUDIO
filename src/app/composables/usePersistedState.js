import { ref, watch } from 'vue'

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

export function usePersistedState(key, initialValue) {
  const state = ref(initialValue)

  const raw = localStorage.getItem(key)
  if (raw != null) state.value = safeParse(raw, initialValue)

  watch(
    state,
    (v) => {
      localStorage.setItem(key, JSON.stringify(v))
    },
    { deep: true }
  )

  return state
}

