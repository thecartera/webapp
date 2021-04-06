<template>
  <div>
    <Navbar />
    <SimpleWallet :wallet="wallet" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SimpleWallet from '@/components/SimpleWallet.vue'

export default {
  name: 'WalletView',

  components: {
    Navbar,
    SimpleWallet
  },

  props: {
    id: {
      default: '',
      type: String
    }
  },

  data: () => ({
    wallet: {}
  }),

  async created () {
    let accessToken
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
    }
    this.wallet = await this.finance.fetchWallet(this.id, accessToken)
  }
}
</script>
