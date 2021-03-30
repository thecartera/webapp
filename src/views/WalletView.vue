<template>
  <div>
    <Navbar />
    <br>
    <UserAndDescription :userData=mockUserData />
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

  computed: {
    mockUserData () {
      const userData = {
        user: '@novak',
        name: 'Gabriel Novak',
        title: 'Head of Capitalz Match',
        description: '📚 Interessado em mercado de capitais \n💰 Capitalz Founder \n🎖 Twitter: GabrielNovak ',
        location: 'Florianópolis, SC'
      }
      return userData
    }
  },

  async created () {
    this.wallet = await this.finance.fetchWallet(this.id)
  },

  async getUserAndDescription () {
    this.userData = await this.finance.fetchUserData(this.userId)
  }
}
</script>
