import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main'
import WalletCreate from '@/views/WalletCreate'
import Profile from '@/views/Profile'
import { authGuard } from '../auth/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/wallets'
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: WalletCreate,
    beforeEnter: authGuard
  },
  {
    path: '/wallets/:id',
    name: 'wallet',
    component: Main,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
