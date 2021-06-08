<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <WalletCreate />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletCreate from '@/components/WalletCreate'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'WalletCreateView',

  components: {
    Navbar,
    WalletCreate,
    ThreeColumnsLayout
  }
}
</script>
