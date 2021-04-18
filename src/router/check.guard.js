import store from '@/store'

import { CHECK_AUTH } from '@/store/actions.type'

/**
 * Checks for credentials on every route
 */
export default async (to, from, next) => {
  if (store.state.auth.auth) {
    return next()
  }
  await store.dispatch(CHECK_AUTH)
  next()
}
