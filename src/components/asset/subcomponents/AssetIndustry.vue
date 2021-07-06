<template>
  <b-card v-if="sector || industry" style="border-color: #DBDAD7" class="pl-3">
    <b-row v-if="sector" align-v="end">
      <span class="text-secondary"> Setor </span>
    </b-row>
    <b-row v-if="sector" align-v="end">
      <span> {{ sector }} </span>
    </b-row>
    <b-row class="mt-3" v-if="industry" align-v="end">
      <span class="text-secondary"> Indústria </span>
    </b-row>
    <b-row v-if="industry" align-v="end">
      <span> {{ industry }} </span>
    </b-row>
  </b-card>
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
    industry: ''
  }),

  methods: {
    getSector (ticker) {
      return client.utils.getSector(ticker)
    },

    getIndustry (ticker) {
      return client.utils.getIndustry(ticker)
    }
  },

  watch: {
    ticker: function (newTicker) {
      let ticker = newTicker
      if (newTicker.slice(-1) === 'F') {
        ticker = newTicker.slice(0, newTicker.length - 1)
        console.log(ticker)
      }
      this.sector = this.getSector(ticker)
      this.industry = this.getIndustry(ticker)
    }
  },

  created () {
    let ticker = this.ticker
    if (this.ticker.slice(-1) === 'F') {
      ticker = this.ticker.slice(0, this.ticker.length - 1)
      console.log(ticker)
    }
    this.sector = this.getSector(ticker)
    this.industry = this.getIndustry(ticker)
  }
}
</script>
