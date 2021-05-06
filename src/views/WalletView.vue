<template>
  <div style="background-color: #F3F2EF">
    <Navbar />
    <Wallet :id="id" style="min-height: 60rem"/>
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
