import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Main/Home.vue'
import Business from '../components/Main/Business.vue'
import Users from '../components/Main/Users.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/empresas',
    name: 'Business',
    component: Business
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: Users
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
