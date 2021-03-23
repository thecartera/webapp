<template>
  <div>
    <Navbar />
    <Wallet :wallet="wallet" />
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
    }
  },

  data: () => ({
    wallet: {}
  }),

  async created () {
    this.wallet = await this.finance.fetchWallet(this.id)
  }
}
</script>
