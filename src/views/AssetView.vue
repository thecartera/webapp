<template>
  <div>
    <FollowsNavbar />

    <ThreeColumnsLayout>
      <Asset :ticker="ticker" />
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import FollowsNavbar from '@/components/navbars/FollowsNavbar'
import Asset from '@/components/asset/Asset'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'AssetView',

  components: {
    FollowsNavbar,
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
