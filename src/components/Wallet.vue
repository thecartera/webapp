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

    <b-table hover :items="wallet.tickers" />

    <b-card-footer>
      <WalletAddTickerForm @submit="addTicker" />
    </b-card-footer>
  </b-card>
</template>

<script>
import WalletAddTickerForm from '@/components/WalletAddTickerForm'

export default {
  name: 'Wallet',

  components: {
    WalletAddTickerForm
  },

  props: {
    id: {
      default: '',
      type: String
    }
  },

  data: () => ({
    tickers: []
  }),

  computed: {
    wallet () {
      return {
        tickers: this.tickers.map(({ amount, ticker }) => ({ amount, ticker }))
      }
    }
  },

  methods: {
    async saveWallet (e) {
      const wallet = await this.finance.postWallet(this.wallet)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      const { price } = await this.finance.fetchTicker(ticker)
      this.tickers.push({ ticker, amount, price })
    }
  },

  async created () {
    if (this.id === '') {
      return
    }

    const wallet = await this.finance.fetchWallet(this.id)

    for (const { ticker, amount } of wallet.tickers) {
      const { price } = await this.finance.fetchTicker(ticker)
      this.tickers.push({ ticker, amount, price })
    }
  }
}
</script>
