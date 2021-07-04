<template>
  <b-container class="p-0 m-0">
    <b-row>
      <AssetChart
        v-if="ticker"
        :ticker="ticker"
        :days="days"
        class="mx-auto col-12"
        style="height: 12rem"
      />
    </b-row>
    <b-row class="mt-5 mx-auto">
      <span class="pr-1"> Ver no </span>
      <b-link
      :href="`https://tvc6.investing.com/init.php?family_prefix=tvc6&
      time=1624737102&
      domain_ID=30&
      lang_ID=12&
      timezone_ID=12&
      pair_ID=${getCode(ticker)}&
      interval=86400&
      refresh=24&
      session=session&
      user=guest&
      width=1000&
      height=1000&
      init_page=live-charts`"
      >
        Trading view
      </b-link>
    </b-row>
  </b-container>
</template>

<script>
import AssetChart from '@/components/asset/subcomponents/AssetChart'
import client from '@/commons/client.api'

export default {
  name: 'AssetChartTab',

  components: {
    AssetChart
  },

  props: {
    days: {
      type: Number,
      required: true
    },
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    assetHistory: {}
  }),

  methods: {
    getCode (ticker) {
      return client.utils.getCode(ticker)
    }
  }
}
</script>
