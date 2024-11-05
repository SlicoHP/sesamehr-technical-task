import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
        params: { id: import.meta.env.VITE_VACANCY_ID },
      },
    },
    {
      path: '/vacancy/:id',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
