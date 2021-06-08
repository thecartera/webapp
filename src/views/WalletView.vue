<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <Wallet :id="id" />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Wallet from '@/components/Wallet'
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
