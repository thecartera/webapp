<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> {{ wallet.id }} </b-col>
        <b-col class="text-right" :class="style"> {{ monthly }}% </b-col>
      </b-row>
    </b-card-title>
    <b-card-sub-title> {{ created }} </b-card-sub-title>

    <b-card-body>
      <b-table hover :fields="fields" :items="wallet.assets">
        <template #cell(ticker)="data"> {{ data.value.toUpperCase() }} </template>
        <template #cell(price)="data"> R$ {{ round(data.value) }} </template>
        <template #cell(weight)="data"> {{ round(data.value) }} % </template>
        <template #cell(monthlyGain)="data"> {{ round(data.value) }} % </template>
        <template #cell(date)="data"> {{ new Date(data.value).toDateString() }} </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'Wallet',

  props: {
    wallet: {
      default: () => ({ assets: [] }),
      type: Object
    }
  },

  data: () => ({
    fields: [
      { key: 'ticker', label: 'Código' },
      { key: 'price', label: 'Preço' },
      { key: 'weight', label: 'Peso' },
      { key: 'date', label: 'Data' },
      { key: 'monthlyGain', label: 'Lucro mensal' }
    ]
  }),

  computed: {
    created () {
      return new Date(this.wallet.createdAt)
    },

    monthly () {
      return Math.round(this.wallet.monthlyGain * 100) / 100
    },

    style () {
      return this.monthly < 0 ? 'text-danger' : 'text-success'
    }
  },

  methods: {
    round (val, places = 2) {
      return Math.round(val * 10 * places) / (places * 10)
    }
  }
}
</script>
