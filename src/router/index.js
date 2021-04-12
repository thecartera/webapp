import Vue from 'vue'
import VueRouter from 'vue-router'

import WalletView from '@/views/WalletView'
import WalletCreate from '@/views/WalletCreate'
import Profile from '@/views/Profile'
import WalletChart from '@/components/WalletChart'
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
    path: '/walletChart',
    name: 'walletChart',
    component: WalletChart
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
    component: WalletView,
    props: true
  },
  {
    path: '/users/:id',
    name: 'user',
    component: Profile,
    props: true,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  routes
})

export default router
