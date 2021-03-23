<template>
  <div>
    <Navbar />
    <WalletEditor />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletEditor from '@/components/WalletEditor'

export default {
  name: 'WalletCreate',

  components: {
    Navbar,
    WalletEditor
  }
}
</script>
