<template>
<div>
  <span class="text-secondary"> Setor </span>
  <p> {{ sector }} </p>
  <span class="text-secondary"> Subsetor </span>
  <p> {{ subsector }} </p>
  <span class="text-secondary"> Segmento </span>
  <p> {{ segment }} </p>
</div>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'AssetIndustry',

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    sector: '',
    subsector: ''
  }),

  methods: {
    getSector (ticker) {
      return client.utils.getSector(ticker)
    },

    getSubsector (ticker) {
      return client.utils.getSubsector(ticker)
    },

    getSegment (ticker) {
      return client.utils.getSegment(ticker)
    }
  },

  watch: {
    ticker: function (newTicker) {
      let ticker = newTicker
      if (newTicker.slice(-1) === 'F') {
        ticker = newTicker.slice(0, newTicker.length - 1)
      }
      this.sector = this.getSector(ticker)
      this.subsector = this.getSubsector(ticker)
      this.segment = this.getSegment(ticker)
    }
  },

  created () {
    let ticker = this.ticker
    if (this.ticker.slice(-1) === 'F') {
      ticker = this.ticker.slice(0, this.ticker.length - 1)
    }
    this.sector = this.getSector(ticker)
    this.subsector = this.getSubsector(ticker)
    this.segment = this.getSegment(ticker)
  }
}
</script>
