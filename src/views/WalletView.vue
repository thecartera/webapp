<template>
  <div>
    <Navbar :userData="userData"/>
    <Wallet :wallet="wallet"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Wallet from '@/components/Wallet'

export default {
  name: 'WalletView',

  components: {
    Navbar,
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
    // ONLY USED TO GET THE PROFILE IMAGE
    let accessToken
    // while (this.$auth.loading) {}
    console.log('HERE')
    console.log(this.$auth.isAuthenticated)
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.userData = await this.finance.fetchMyUser(accessToken)
    }
    // USED TO GET WALLET ASSETS
    this.wallet = await this.finance.fetchWallet(this.id)
  }
}
</script>
