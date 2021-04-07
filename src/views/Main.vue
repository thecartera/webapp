<template>
  <div>
    <Navbar :userData="userData"/>
    <br>
    <Profile :userData="userData"/>
    <br>
    <Wallet :wallet="wallet"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import Wallet from '@/components/Wallet'

export default {
  name: 'Main',

  components: {
    Navbar,
    Profile,
    Wallet
  },

  props: {
    id: {
      default: '',
      type: String
    },

    userId: {
      default: '',
      type: String
    }
  },

  data: () => ({
    wallet: {},
    userData: {}
  }),

  async created () {
    let accessToken
    // while (this.$auth.loading) {}
    console.log('HERE')
    console.log(this.$auth.isAuthenticated)
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.userData = await this.finance.fetchMyUser(accessToken)
    }
    this.wallet = await this.finance.fetchWallet(this.id)
  }
}
</script>
