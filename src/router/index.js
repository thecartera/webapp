import Vue from 'vue'
import VueRouter from 'vue-router'

import WalletView from '@/views/WalletView'
import AssetView from '@/views/AssetView'
import ProfileView from '@/views/ProfileView'
import WalletCreateView from '@/views/WalletCreateView'
import FollowersView from '@/views/FollowersView'
import FollowingView from '@/views/FollowingView'
import LandingPage from '@/views/LandingPageView'
import WalletEditorView from '@/views/WalletEditorView'
import Settings from '@/views/SettingsView'
import SingleEventView from '@/views/SingleEventView'
import FeedView from '@/views/FeedView'
import WalletNotFoundView from '@/views/WalletNotFoundView'
import Error404View from '@/views/Error404View'

import AuthGuard from './auth.guard'
import FeedGuard from './feed.guard'
import CheckGuard from './check.guard'
import CallbackGuard from './callback.guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
    beforeEnter: FeedGuard
  },
  {
    path: '/callback',
    name: 'Callback',
    beforeEnter: CallbackGuard
  },
  {
    path: '/walletNotFound',
    name: 'walletNotFound',
    component: WalletNotFoundView
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
    path: '/assets/:ticker',
    name: 'asset',
    component: AssetView,
    props: true
  },
  {
    path: '/wallets/:id/edit',
    name: 'editwallet',
    component: WalletEditorView,
    props: true
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/feed',
    name: 'feed',
    component: FeedView
  },
  {
    path: '/events/:id',
    name: 'event',
    component: SingleEventView,
    props: true
  },
  {
    path: '/users/:id',
    name: 'user',
    component: ProfileView,
    props: true
  },
  {
    path: '/users/:id/followers',
    name: 'followers',
    component: FollowersView,
    props: true
  },
  {
    path: '/users/:id/following',
    name: 'following',
    component: FollowingView,
    props: true
  },
  {
    path: '/terms_of_service',
    name: 'termsOfService',
    component: Settings
  },
  {
    path: '/privacy_policy',
    name: 'PrivacyPolicy',
    component: Settings
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404View
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(CheckGuard)

export default router
