import Vue from 'vue'
import VueRouter from 'vue-router'

import WalletView from '@/views/WalletView'
import ProfileView from '@/views/ProfileView'
import WalletCreateView from '@/views/WalletCreateView'
import FollowersView from '@/views/FollowersView'
import FollowingView from '@/views/FollowingView'
import LandingPage from '@/views/LandingPageView'
import WalletEditorView from '@/views/WalletEditorView'
import TermsOfService from '@/views/legal/TermsOfServiceView'
import PrivacyPolicy from '@/views/legal/PrivacyPolicyView'
import Settings from '@/views/SettingsView'
import FeedView from '@/views/FeedView'
import WalletNotFoundView from '@/views/WalletNotFoundView'

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
    component: TermsOfService
  },
  {
    path: '/privacy_policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(CheckGuard)

export default router
