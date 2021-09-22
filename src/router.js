import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('./views/**/**.vue')
const NotFound = () => import('./components/NotFound.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: modules['./views/Login.vue'],
  },
  {
    path: '/home',
    name: 'home',
    component: modules['./views/Home.vue'],
    children: [
      {
        name: 'homePage',
        path: '/home/homePage',
        component: modules['./views/Homepage.vue']
      }
    ]
  },
  {
    path: '/notFound',
    name: 'not_found',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
