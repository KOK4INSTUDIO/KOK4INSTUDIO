import { defineStore } from 'pinia'

function uid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),
  actions: {
    show({ type = 'info', title = '', message = '', duration = 3000 } = {}) {
      const id = uid()
      this.toasts.push({ id, type, title, message })
      if (duration > 0) setTimeout(() => this.remove(id), duration)
      return id
    },
    success(message, title = 'Success') {
      return this.show({ type: 'success', title, message })
    },
    error(message, title = 'Error') {
      return this.show({ type: 'error', title, message, duration: 5000 })
    },
    remove(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    }
  }
})

