import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },{
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },{
      path: '/Signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue'),
    },
  ],
})

export default router
