import store from '@/store'

/**
 * If logged in, goes to feed. Else, goes to landing page
 */
export default (to, from, next) => {
  if (store.state.auth.auth) {
    return next({ name: 'feed' })
  }
  return next()
}
