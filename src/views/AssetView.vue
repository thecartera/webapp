<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <Asset :ticker="ticker" />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/navbars/Navbar'
import Asset from '@/components/asset/Asset'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'AssetView',

  components: {
    Navbar,
    Asset,
    ThreeColumnsLayout
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  }
}
</script>
