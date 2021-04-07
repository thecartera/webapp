<template>
  <div>
    <Navbar :userData="userData"/>
    <Profile :userData="userData"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'

export default {
  name: 'ProfileView',

  components: {
    Navbar,
    Profile
  },

  data: () => ({
    userData: {}
  }),

  async created () {
    let accessToken
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.userData = await this.finance.fetchMyUser(accessToken)
    }
  }
}
</script>
