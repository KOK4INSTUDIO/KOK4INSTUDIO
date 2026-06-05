<template>
  <div id="app-content" v-html="htmlContent"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import rawHtml from '../../../../index-content.html?raw'
import '../../../../style.css'

const htmlContent = ref(rawHtml)

function safeParse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function applySeoAndBranding() {
  const settings = safeParse(localStorage.getItem('kok4_admin_settings_v1') || 'null')
  if (!settings) return

  // SEO title + description (runtime)
  if (settings.seo?.title) document.title = settings.seo.title
  if (settings.seo?.description) {
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', settings.seo.description)
  }

  // Favicon (runtime)
  const faviconMediaId = settings.branding?.faviconMediaId
  if (faviconMediaId) {
    const media = safeParse(localStorage.getItem('kok4_admin_media_v1') || 'null') || []
    const item = media.find((m) => m.id === faviconMediaId)
    if (item?.dataUrl) {
      let link = document.querySelector('link[rel="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'icon')
        document.head.appendChild(link)
      }
      link.setAttribute('href', item.dataUrl)
    }
  }
}

onMounted(async () => {
  applySeoAndBranding()

  // Muat script legacy setelah DOM siap (agar interaksi tetap bekerja).
  await import('../../../../script.js')
})
</script>
