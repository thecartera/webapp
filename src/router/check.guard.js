import store from '@/store'

import auth0 from '@/commons/auth.api'
import client from '@/commons/client.api'

import { CHECK_AUTH } from '@/store/actions.type'

/**
 * Checks for credentials on every route
 */
export default async (to, from, next) => {
  await store.dispatch(CHECK_AUTH)
  if (store.state.auth.auth) {
    const token = await auth0.getTokenSilently()
    client.setToken(token)
  }
  next()
}
