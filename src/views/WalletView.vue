<template>
  <div>
    <Navbar/>
    <Wallet :id="id"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Wallet from '@/components/Wallet.vue'

export default {
  name: 'WalletView',

  props: {
    id: {
      type: String,
      default: ''
    }
  },

  components: {
    Navbar,
    Wallet
  }
}
</script>
