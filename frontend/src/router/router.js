import { createRouter, createWebHistory } from 'vue-router'
// import parentProductsList from '../products/ParentList.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../components/auth/Auth.vue')
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: () => import('../components/auth/SignUp.vue')
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: () => import('../components/auth/SignIn.vue')
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: () => import('../components/DashBoard.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router