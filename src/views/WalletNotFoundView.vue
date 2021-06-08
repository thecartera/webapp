<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <WalletNotFound />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletNotFound from '@/components/WalletNotFound'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'WalletNotFoundView',

  components: {
    Navbar,
    WalletNotFound,
    ThreeColumnsLayout
  }
}
</script>
