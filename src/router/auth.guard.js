import store from '@/store'

import { LOGIN } from '@/store/actions.type'

/**
 * If logged in, continue. Else, tries to log in
 */
export default (to, from, next) => {
  if (store.state.auth.auth) {
    return next()
  }
  const state = { to: to.path }
  store.dispatch(LOGIN, state)
}
