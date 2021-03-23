<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> Carteira </b-col>
        <b-col class="text-right">
          <b-button @click="saveWallet"> Salvar </b-button>
        </b-col>
      </b-row>
    </b-card-title>

    <b-table @row-clicked="onRowClicked" hover :items="assets">
    </b-table>

    <b-card-footer>
      <WalletAddTickerForm @submit="addTicker" />
    </b-card-footer>
  </b-card>
</template>

<script>
import WalletAddTickerForm from '@/components/WalletAddTickerForm'

export default {
  name: 'WalletEditor',

  components: {
    WalletAddTickerForm
  },

  data: () => ({
    assets: []
  }),

  computed: {
    wallet () {
      return {
        assets: this.assets.map(({ ticker, amount }) => ({ ticker, amount }))
      }
    }
  },

  methods: {
    async saveWallet (e) {
      const wallet = await this.finance.postWallet(this.wallet)
      console.log(wallet)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      const { price, monthlyGain } = await this.finance.fetchAsset(ticker)
      this.assets.push({ ticker, price, monthlyGain, amount })
    },

    onRowClicked (_, i) {
      this.assets.splice(i, 1)
    }
  }
}
</script>
