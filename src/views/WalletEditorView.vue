<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <WalletEditor :id="id" />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import WalletEditor from '@/components/WalletEditor'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'WalletEditorView',

  components: {
    Navbar,
    WalletEditor,
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
