<template>
  <div>
    <Navbar />
    <br>
    <Register />
  </div>
</template>

<script>
import Register from '@/components/Register'
import Navbar from '@/components/Navbar'

export default {
  name: 'RegisterView',

  components: {
    Navbar,
    Register
  },

  async created () {
    let accessToken
    if (this.$auth.isAuthenticated) {
      accessToken = await this.$auth.getTokenSilently()
      await this.finance.registerMyUser(accessToken)
      await this.$router.push('/profile')
    }
  }
}
</script>
