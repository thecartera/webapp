<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> Wallet </b-col>
        <b-col class="text-right">
          <b-button @click="saveWallet"> Save </b-button>
        </b-col>
      </b-row>
    </b-card-title>

    <b-table hover :items="tickers" />

    <b-card-footer>
      <b-form @submit.prevent="newTicker">
        <b-form-input v-model="ticker" placeholder="Ticker code" />
      </b-form>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'Wallet',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  data: () => ({
    tickers: [],
    ticker: ''
  }),

  computed: {
    wallet () {
      return { tickers: this.tickers.map(i => i.code) }
    }
  },

  methods: {
    saveWallet (e) {
      this.finance.postWallet(this.wallet)
    },

    newTicker (e) {
      this.finance.fetchQuote(this.ticker)
        .then(r => this.tickers.push(r))
        .then(() => { this.ticker = '' })
    }
  }
}
</script>
