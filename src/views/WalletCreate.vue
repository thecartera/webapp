<template>
  <div>
    <Navbar :userData="userData" />
    <WalletCreate />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletCreate from '@/components/WalletCreate'

export default {
  name: 'WalletCreateView',

  components: {
    Navbar,
    WalletCreate
  },

  data: () => ({
    userData: {}
  }),

  async created () {
    let accessToken
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      this.userData = await this.finance.fetchMyUser(accessToken)
    }
  }
}
</script>
