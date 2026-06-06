<template>
  <RouterView />
  <ToastHost />
  <ConfirmDialogHost />
</template>

<script setup>
import { RouterView } from 'vue-router'
import ConfirmDialogHost from './app/components/ui/ConfirmDialogHost.vue'
import ToastHost from './app/components/ui/ToastHost.vue'
</script>
