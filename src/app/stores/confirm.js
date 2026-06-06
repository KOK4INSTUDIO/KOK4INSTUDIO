import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', {
  state: () => ({
    open: false,
    title: 'Konfirmasi',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'danger', // danger | primary
    _resolver: null
  }),
  actions: {
    request({
      title = 'Konfirmasi',
      message = '',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      variant = 'danger'
    } = {}) {
      this.open = true
      this.title = title
      this.message = message
      this.confirmText = confirmText
      this.cancelText = cancelText
      this.variant = variant

      return new Promise((resolve) => {
        this._resolver = resolve
      })
    },
    confirm() {
      if (this._resolver) this._resolver(true)
      this._reset()
    },
    cancel() {
      if (this._resolver) this._resolver(false)
      this._reset()
    },
    _reset() {
      this.open = false
      this.message = ''
      this._resolver = null
    }
  }
})

