<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <Wallet :id="id" />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/navbars/Navbar'
import Wallet from '@/components/wallet/Wallet'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'WalletView',

  components: {
    Navbar,
    Wallet,
    ThreeColumnsLayout
  },

  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
