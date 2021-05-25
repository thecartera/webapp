<template>
  <div>
    <Navbar />
    <WalletNotFound />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletNotFound from '@/components/WalletNotFound'

export default {
  name: 'WalletNotFoundView',

  components: {
    Navbar,
    WalletNotFound
  }
}
</script>
