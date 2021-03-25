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

    <b-table :stacked="isStacked" responsive='lg' :fields="fields" hover :items="assets">
      <template #cell(index)="data" >
        <p></p>
        <p style="font-family:'Courier New'"> {{ data.index + 1 }} </p>
      </template>
      <template #cell(image)="data">
        <b-avatar :src="data.item.imageLink" size="3.2em" icon="wallet2" variant="info"></b-avatar>
      </template>
      <template #cell(nameticker)="data">
        <span style="font-size:0.8rem;color:gray"> {{ data.item.name }} </span>
        <p style="font-family:'Courier New';font-size:1.2rem"> {{ data.item.ticker.toUpperCase() }} </p>
      </template>
      <template #cell(amount)="data">
        <span style="font-size:0.8rem;color:gray">Quantidade</span>
        <p style="font-family:'Courier New';font-size:1.2rem;color:#0275B1"> {{ data.value }} </p>
      </template>
      <template #cell(formattedPrice)="data">
        <span style="font-size:0.8rem;color:gray">Preço Atual</span>
        <p style="font-family:'Courier New';font-size:1.2rem;color:#0275B1"> R$ {{ data.value }} </p>
      </template>
      <template #cell(formattedGain30d)="data">
        <span style="font-size:0.8rem;color:gray">Retorno (30 dias)</span>
        <p :class="positive(data.value)" style="font-family:'Courier New';font-size:1.2rem"> {{ round(data.value) }}% </p>
      </template>
      <template #cell(remove)="data">
        <p></p>
        <b-icon icon="x" scale="1.3" @click="deleteRow(data.index)" variant="dark"> {{ data }} </b-icon>
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
      { key: 'index', label: '', class: 'text-left' },
      { key: 'image', label: '', class: 'text-left' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'amount', label: 'Quantidade', class: 'text-center', sortable: true },
      { key: 'formattedPrice', label: 'Preço Atual', class: 'text-center', sortable: true },
      { key: 'formattedGain30d', label: 'Rendimento', class: 'text-center', sortable: true },
      { key: 'remove', label: '', class: 'text-center' }
    ],
    assets: [],
    isStacked: true
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
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      const { price, gain30d, name } = await this.finance.fetchAsset(ticker)
      const formattedPrice = this.round(price)
      const formattedGain30d = this.round(gain30d)
      const link = ticker.toUpperCase().replace(/[0-9]/g, '')
      const imageLink = `https://pro.clear.com.br/src/assets/symbols_icons/${link}.png`
      this.assets.push({ ticker, name, formattedPrice, formattedGain30d, amount, imageLink })
      // workaround to make header not show when no asset added yet.
      this.isStacked = false
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
