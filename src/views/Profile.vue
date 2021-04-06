<template>
  <div>
    <Navbar :userData="userData"/>
    <br>
    <Profile :userData="userData"/>
  </div>
</template>

<script>
import Profile from '@/components/UserAndDescription'
import Navbar from '@/components/Navbar'

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
    }
    this.userData = await this.finance.fetchMyUser(accessToken)
  }
}
</script>
