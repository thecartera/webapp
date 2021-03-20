import Vue from 'vue'
import VueRouter from 'vue-router'

import Wallet from '@/components/Wallet'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/wallets'
  },
  {
    path: '/wallets/:id?',
    name: 'wallet',
    component: Wallet,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
