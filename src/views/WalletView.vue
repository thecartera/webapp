<template>
  <div style="min-height: 200vh">
    <Navbar />
    <Wallet :id="id" style="overflow-x: hidden"/>
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
      type: String,
      required: true
    }
  }
}
</script>
