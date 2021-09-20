import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('./views/Login.vue')
const Home = () => import('./views/Home.vue')
const NotFound = () => import('./components/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/notFound',
    name: 'not_found',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
