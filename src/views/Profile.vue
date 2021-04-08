<template>
  <div>
    <Navbar :userData="myData"/>
    <Profile v-bind="userData"/>
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

  props: {
    id: {
      default: '',
      type: String
    }
  },

  data: () => ({
    userData: {},
    myData: {}
  }),

  async created () {
    let accessToken
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.userData = await this.finance.fetchUser(this.id, accessToken)
      this.userData.wallets = await this.finance.fetchWalletsByUser(this.id, accessToken)
      this.myData = await this.finance.fetchMyUser(accessToken)
    }
  }
}
</script>
