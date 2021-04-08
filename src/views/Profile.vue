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
    // if we don't use userTempData, we can pass data without the wallets ids list
    userTempData: {},
    userData: {},
    myData: {}
  }),

  methods: {
    async reloadPageWithNewId (newId) {
      if (this.$auth.isAuthenticated) {
        const accessToken = await this.$auth.getTokenSilently()
        this.userTempData = await this.finance.fetchUser(newId, accessToken)
        this.userTempData.wallets = await this.finance.fetchWalletsByUser(this.id, accessToken)
        this.userData = this.userTempData
      }
    }
  },

  watch: {
    id: function (newVal, oldVal) { // watch if opening another user profile
      this.reloadPageWithNewId(newVal)
    }
  },

  async created () {
    if (this.$auth.isAuthenticated) {
      const accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      this.myData = await this.finance.fetchMyUser(accessToken)
      this.userTempData = await this.finance.fetchUser(this.id, accessToken)
      this.userTempData.wallets = await this.finance.fetchWalletsByUser(this.id, accessToken)
      this.userData = this.userTempData
    }
  }
}
</script>
