import Vue from 'vue'
import VueRouter from 'vue-router'

import WalletView from '@/views/WalletView'
import ProfileView from '@/views/ProfileView'
import WalletCreateView from '@/views/WalletCreateView'

import AuthGuard from './auth.guard'
import CheckGuard from './check.guard'
import CallbackGuard from './callback.guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/wallets'
  },
  {
    path: '/callback',
    name: 'Callback',
    beforeEnter: CallbackGuard
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: AuthGuard
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: WalletCreateView,
    beforeEnter: AuthGuard
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
    component: ProfileView,
    props: true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(CheckGuard)

export default router
