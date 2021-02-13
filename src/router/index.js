import Vue from 'vue'
import VueRouter from 'vue-router'

import FeedView from '../views/FeedView'
import UserView from '../views/UserView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/me'
  },
  {
    path: '/me',
    component: UserView
  },
  {
    path: '/feed',
    component: FeedView
  }
]

export default new VueRouter({
  routes
})
