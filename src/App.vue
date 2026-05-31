<template>
  <div id="app-content" v-html="htmlContent"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import rawHtml from '../index-content.html?raw'

export default {
  setup() {
    const htmlContent = ref(rawHtml)
    onMounted(async () => {
      // load the original interactive script after DOM is mounted
      await import('../script.js')
    })
    return { htmlContent }
  }
}
</script>
