import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SectionDetails from '../views/SectionDetails.vue'
import AdminPanel from '../views/AdminPanel.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/section/:id', component: SectionDetails },
  { path: '/admin', component: AdminPanel },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // повертає користувача на попереднє місце прокрутки
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' } // плавно скролить до блоку
    }
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.path === '/admin' && localStorage.getItem('isAdmin') !== 'true') {
    next('/') // редірект на головну, якщо не адмін
  } else {
    next()
  }
})
export default router
