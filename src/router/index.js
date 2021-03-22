import Vue from 'vue'
import VueRouter from 'vue-router'

import WalletView from '@/views/WalletView'

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
    component: WalletView,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
