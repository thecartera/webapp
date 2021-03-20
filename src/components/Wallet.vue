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
    id: {
      default: '',
      type: String
    }
  },

  data: () => ({
    ticker: '',
    tickers: []
  }),

  computed: {
    wallet () {
      return {
        tickers: this.tickers.map(i => ({ ticker: i.ticker }))
      }
    }
  },

  methods: {
    async saveWallet (e) {
      const wallet = await this.finance.postWallet(this.wallet)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async newTicker (e) {
      const ticker = await this.finance.fetchTicker(this.ticker)
      this.tickers.push(ticker)
      this.ticker = ''
    }
  },

  async created () {
    if (this.id === '') {
      return
    }

    const wallet = await this.finance.fetchWallet(this.id)

    for (const ticker of wallet.tickers) {
      this.finance.fetchTicker(ticker.ticker)
        .then(r => this.tickers.push(r))
    }
  }
}
</script>
