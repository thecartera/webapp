<template>
  <div>
    <Navbar />
    <WalletEditor :id="id" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletEditor from '@/components/WalletEditor'

export default {
  name: 'WalletEditorView',

  components: {
    Navbar,
    WalletEditor
  },

  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
