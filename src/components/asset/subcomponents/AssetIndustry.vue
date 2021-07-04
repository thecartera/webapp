<template>
  <b-card style="border-color: #DBDAD7">
    <b-row align-v="end">
      <span> Setor </span>
    </b-row>
    <b-row align-v="end">
      <h5> {{ getSector(ticker) }} </h5>
    </b-row>
    <b-row align-v="end">
      <span> Indústria </span>
    </b-row>
    <b-row align-v="end">
      <h5> {{ getIndustry(ticker) }} </h5>
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

  methods: {
    getSector (ticker) {
      return client.utils.getSector(ticker)
    },

    getIndustry (ticker) {
      return client.utils.getIndustry(ticker)
    }
  }
}
</script>
