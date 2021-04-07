<template>
  <div v-if="!$auth.loading">
    <Navbar :userData="test()"/>
    <br>
    <Profile :userData="test()"/>
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

  method: {
    async test () {
      let accessToken
      // while (this.$auth.loading) {}
      console.log('HERE')
      console.log(this.$auth.isAuthenticated)
      if (this.$auth.isAuthenticated) {
        accessToken = await this.$auth.getTokenSilently()
        await this.finance.registerMyUser(accessToken)
        const userData = await this.finance.fetchMyUser(accessToken)
        return userData
      }
    }
  },

  async created () {
    this.wallet = await this.finance.fetchWallet(this.id)
  }

}
</script>
