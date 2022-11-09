import { createRouter, createWebHistory } from 'vue-router'
// import parentProductsList from '../products/ParentList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HomePage.vue')
  },
  // {
  //   path: '/auth',
  //   name: 'Auth',
  //   component: () => import('../components/auth/Auth.vue')
  // },
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
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../components/HomePage.vue')
  },
  {
    path: '/edit-current-user',
    name: 'EditCurrentUser',
    component: () => import('../components/EditUser/EditUser.vue')
  },
  {
    path: '/user/:id',
    name: 'UserPage',
    component: () => import('../components/UserPage.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => import('../components/NotFound.vue')
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router