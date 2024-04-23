import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'today',
          name: 'today',
          component: () => import('@/views/today/index.vue')
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('@/views/statistics/index.vue')
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('@/views/detail/index.vue')
        }
      ]
    }
  ]
})

export default router
