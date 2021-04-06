<template>
  <div>
    <Navbar />
    <br>
    <UserAndDescription :userData=userData />
    <br>
    <Wallet :wallet="wallet" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import UserAndDescription from '@/components/UserAndDescription'
import Wallet from '@/components/Wallet'

export default {
  name: 'WalletView',

  components: {
    Navbar,
    Wallet,
    UserAndDescription: UserAndDescription
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
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
    }
    this.wallet = await this.finance.fetchWallet(this.id, accessToken)
    this.userData = await this.finance.fetchMyUser(accessToken)
  }

}
</script>
