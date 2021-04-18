<template>
  <div>
    <Navbar />
    <WalletCreate />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletCreate from '@/components/WalletCreate'

export default {
  name: 'WalletCreateView',

  components: {
    Navbar,
    WalletCreate
  }
}
</script>
