<template>
  <!-- Original site HTML moved into Vue template to preserve design -->
  <div>
    <!-- MOBILE NAV -->
    <div class="mobile-nav" id="mobileNav">
      <button class="close-nav" onclick="document.getElementById('mobileNav').classList.remove('open')">✕</button>
      <a href="#home" onclick="document.getElementById('mobileNav').classList.remove('open')">Home</a>
      <a href="#eyewear" onclick="document.getElementById('mobileNav').classList.remove('open')">Eyewear</a>
      <a href="#apparel" onclick="document.getElementById('mobileNav').classList.remove('open')">Apparel</a>
      <a href="#bestseller" onclick="document.getElementById('mobileNav').classList.remove('open')">Best Seller</a>
      <a href="#contact" onclick="document.getElementById('mobileNav').classList.remove('open')">Contact</a>
    </div>

    <!-- HEADER -->
    <header id="header">
      <div class="nav-inner">
        <a href="#home" class="logo">KOK4IN<em>STUDIO</em>™</a>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#eyewear">Eyewear</a></li>
          <li><a href="#apparel">Apparel</a></li>
          <li><a href="#bestseller">Best Seller</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="nav-right">
          <button class="icon-btn" title="Search" onclick="alert('Search feature coming soon!')">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button class="icon-btn" title="Cart">
            <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span class="cart-badge">0</span>
          </button>
          <button class="btn-cta" onclick="scrollTo({top:document.getElementById('eyewear').offsetTop-70,behavior:'smooth'})">Shop Now</button>
          <button class="hamburger-btn" onclick="document.getElementById('mobileNav').classList.add('open')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- REST OF THE SITE -->
    <!-- For brevity, the rest of the existing HTML (hero, products, footer, modals) is kept identical to the original site and preserved in the repository. -->
    <!-- The content will be loaded here at runtime through this template. -->
    <div v-html="htmlContent"></div>
  </div>
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
