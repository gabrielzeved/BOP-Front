import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/main/Home.vue'
import Business from '../components/main/Business.vue'
import Users from '../components/main/Users.vue'
import TagRTO from '../components/main/TagRTO.vue'

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
  },{
    path: '/tagrto',
    name: 'TagRTO',
    component: TagRTO
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
