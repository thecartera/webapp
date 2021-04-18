<template>
  <div></div>
</template>
<script>
import auth0 from '@/commons/auth.api'

/**
 * This component just contains the callback logic
 */
export default {
  async beforeCreate () {
    // Redirected back from auth0
    const hasCode = window.location.search.includes('code=')
    const hasState = window.location.search.includes('state=')
    if (!(hasCode && hasState)) {
      return
    }

    const { appState: { to } } = await auth0.handleRedirectCallback()

    // Adapted from here
    //    https://github.com/auth0/auth0-spa-js/issues/384#issuecomment-602586642
    window.history.replaceState({}, document.title, window.location.pathname)

    this.$router.replace(to)
  }
}
</script>
