<template>
<b-card>
  <b-card-header>
    <b-row>
      <AssetIcon :code="asset.ticker" class="ml-1" />
      <span class="ml-2">
        <span> {{ asset.ticker }} </span>
        |
        <span class="text-secondary text-capitalize"> {{ asset.name }} </span>
        <br>
        <strong> R${{ asset.price }} </strong>
      </span>
    </b-row>
  </b-card-header>

  <!-- Chart -->
  <b-card-body>
    <!-- Buttons -->
    <b-row align-h="center">
      <template v-for="i of buttons">
        <b-button @click="click(i)" :key="i.text" :pressed="i.selected" class="ml-1" variant="light">
          {{ i.text }}
        </b-button>
      </template>
    </b-row>

    <br>

    <!-- Title -->
    <b-row align-h="center">
      <h3 :class="priceClass"> {{ asset.gain.toFixed(2) }}% </h3>
    </b-row>
    <AssetChart style="height: 12rem;" :ticker="this.ticker" :days="this.days" />
  </b-card-body>

  <!-- Industry -->
  <AssetIndustry :ticker="ticker" />
</b-card>
</template>

<script>
import client from '@/commons/client.api'

import AssetIcon from '@/components/utils/AssetIcon'
import AssetChart from '@/components/asset/subcomponents/AssetChart'
import AssetIndustry from '@/components/asset/subcomponents/AssetIndustry'

/**
 * Adapted from:
 *     https://stackoverflow.com/a/8619946
 */
const daysInYear = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = Math.floor(now - start)
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export default {
  name: 'Asset',

  components: {
    AssetIcon,
    AssetChart,
    AssetIndustry
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    days: 30,
    asset: {},
    buttons: [
      { text: '7D', days: 7, selected: false },
      { text: '1M', days: 30, selected: true },
      { text: '3M', days: 90, selected: false },
      { text: 'YTD', days: daysInYear(), selected: false }
    ]
  }),

  computed: {
    priceClass () {
      return this.asset.gain > 0 ? 'text-success' : 'text-danger'
    }
  },

  methods: {
    async click (item) {
      this.days = item.days
      this.buttons.forEach(i => { i.selected = false })
      item.selected = true
      this.asset = await client.assets.fetchByTicker(this.ticker, this.days)
    }
  },

  async mounted () {
    this.asset = await client.assets.fetchByTicker(this.ticker)
  }
}
</script>
