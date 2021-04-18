import auth0 from '@/commons/auth.api'
import client from '@/commons/client.api'

import { LOGIN, CHECK_AUTH, LOGOUT } from './actions.type'
import { SET_USER, SET_AUTH, SET_ERROR, PURGE_AUTH } from './mutations.type'

const state = {
  user: {},
  error: {},
  auth: false
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  },
  [SET_AUTH] (state, auth) {
    state.auth = auth
  },
  [SET_ERROR] (state, error) {
    state.error = error
  },
  [PURGE_AUTH] (state) {
    state.user = {}
    state.error = {}
    state.auth = false
  }
}

const actions = {
  async [CHECK_AUTH] (ctx) {
    try {
      // Try logging in
      const token = await auth0.getTokenSilently()
      client.setToken(token)
      const user = await client.users.fetchMyUser()

      // Update state
      ctx.commit(SET_ERROR, {})
      ctx.commit(SET_USER, user)
      ctx.commit(SET_AUTH, true)
    } catch (e) {
      ctx.commit(SET_ERROR, e)
      ctx.commit(SET_USER, {})
      ctx.commit(SET_AUTH, false)
    }
  },
  async [LOGIN] (ctx, state = {}) {
    await auth0.loginWithRedirect({ appState: state })
  },
  async [LOGOUT] (ctx) {
    console.log('LOGOUT STORE')
    ctx.commit(PURGE_AUTH)
    await auth0.logout()
  }
}

export default {
  state,
  actions,
  mutations
}
