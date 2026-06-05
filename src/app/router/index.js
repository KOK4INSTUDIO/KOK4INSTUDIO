import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'public',
      component: () => import('../pages/public/LegacyPublicPage.vue'),
      meta: { title: 'KOK4INSTUDIO™' }
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminShell.vue'),
      children: [
        { path: '', redirect: { name: 'admin-dashboard' } },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../pages/admin/DashboardPage.vue'),
          meta: { title: 'Dashboard' }
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../pages/admin/ProductsPage.vue'),
          meta: { title: 'Products' }
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('../pages/admin/CategoriesPage.vue'),
          meta: { title: 'Categories' }
        },
        {
          path: 'media',
          name: 'admin-media',
          component: () => import('../pages/admin/MediaLibraryPage.vue'),
          meta: { title: 'Media Library' }
        },
        {
          path: 'pre-orders',
          name: 'admin-preorders',
          component: () => import('../pages/admin/PreOrdersPage.vue'),
          meta: { title: 'Pre-Orders' }
        },
        {
          path: 'marketplace',
          name: 'admin-marketplace',
          component: () => import('../pages/admin/MarketplacePage.vue'),
          meta: { title: 'Marketplace' }
        },
        {
          path: 'social-media',
          name: 'admin-social',
          component: () => import('../pages/admin/SocialMediaPage.vue'),
          meta: { title: 'Social Media' }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../pages/admin/SettingsPage.vue'),
          meta: { title: 'Settings' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
      meta: { title: 'Not Found' }
    }
  ]
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} — KOK4INSTUDIO™` : 'KOK4INSTUDIO™'
})

export default router

