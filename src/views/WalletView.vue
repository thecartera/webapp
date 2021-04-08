<template>
  <div>
    <!-- without v-if the image/link could be undefined for a very short period -->
    <Navbar v-if=!isAuthLoading :userData="userData"/>
    <Wallet v-bind="wallet"/>
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

  computed: {
    isAuthLoading () {
      return this.$auth === undefined ? true : this.$auth.loading
    }
  },

  methods: {
    async reloadNavbarWithUserImage () {
      if (this.$auth.isAuthenticated) {
        const accessToken = await this.$auth.getTokenSilently()
        this.userData = await this.finance.fetchMyUser(accessToken)
      }
    }
  },

  watch: {
    isAuthLoading: function (newVal, oldVal) { // watch if auth finished loading
      this.reloadNavbarWithUserImage()
    }
  },

  async created () {
    const auth = this.$auth.isAuthenticated
    if (auth) {
      // ONLY USED TO GET THE PROFILE IMAGE
      const accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.userData = await this.finance.fetchMyUser(accessToken)
    }
    // USED TO GET WALLET ASSETS
    this.wallet = await this.finance.fetchWallet(this.id)
  }
}
</script>
