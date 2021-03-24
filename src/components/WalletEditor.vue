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

    <b-table :fields="fields" hover :items="assets">
      <template #cell(index)="data" >
        <span style="font-family:'Courier New'"> {{ data.index + 1 }} </span>
      </template>
      <template #cell(ticker)="data">
        <span style="font-family:'Courier New'"> {{ data.value.toUpperCase() }} </span>
      </template>
      <template #cell(formattedPrice)="data">
        <span style="font-family:'Courier New'"> R$ {{ data.value }} </span>
      </template>
      <template #cell(amount)="data">
        <span style="font-family:'Courier New'"> {{ data.value }} </span>
      </template>
      <template #cell(formattedGain30d)="data">
        <span :class="positive(data.value)" style="font-family:'Courier New'"> {{ round(data.value) }}% </span>
      </template>
      <template #cell(remove)="data">
          <b-icon icon="x" scale="1.2" @click="deleteRow(data.index)" variant="dark"> {{ data }} </b-icon>
      </template>
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
    fields: [
      { key: 'index', label: ' ', class: 'text-left' },
      { key: 'ticker', label: 'Código', class: 'text-left' },
      { key: 'amount', label: 'Quantidade', class: 'text-left' },
      { key: 'formattedPrice', label: 'Preço Atual', class: 'text-left' },
      { key: 'formattedGain30d', label: 'Rendimento 30 dias', class: 'text-left' },
      { key: 'remove', label: '', class: 'text-left' }
    ],
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
      const { price, gain30d } = await this.finance.fetchAsset(ticker)
      const formattedPrice = this.round(price)
      const formattedGain30d = this.round(gain30d)
      this.assets.push({ ticker, formattedPrice, formattedGain30d, amount })
    },

    deleteRow (i) {
      this.assets.splice(i, 1)
    },

    round (val, places = 2) {
      const decimals = Math.pow(10, places)
      const rounded = Math.round(val * decimals) / decimals
      return rounded.toFixed(2)
    },

    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    }
  }
}
</script>
