<template>
  <b-card no-body style="border-color:white">
    <b-card-title>
      <b-row>
        <b-col>
          <h5 class="text-dark" style="padding: 0.4rem 0.4rem">
            Carteira
          </h5>
        </b-col>
        <b-col class="text-right" style="padding: 0.4rem 1.2rem">
          <b-button @click="saveWallet"> Salvar </b-button>
        </b-col>
      </b-row>
    </b-card-title>

  <b-card-body class="container px-0" body-bg-variant="white">
    <b-table :stacked="isStacked" responsive='lg' :fields="fields" hover :items="assets" small>
      <!-- ASSET IMAGE -->
      <template #cell(image)="data">
        <b-avatar :src="data.item.imageLink" size="3em" icon="wallet2" variant="light"></b-avatar>
      </template>

      <!-- ASSET INDEX, NAME, TICKER -->
      <template #cell(nameticker)="data">
        <span class="cell-name"> {{ data.index + 1 }}. </span>
        <span class="cell-name"> {{ data.item.name }} </span>
        <p class="cell-value"> {{ data.item.ticker.toUpperCase() }} </p>
      </template>

      <!-- ASSET QUANTITY -->
      <template #cell(amount)="data">
        <span class="cell-name">Qtd.</span>
        <p class="light-blue cell-value"> {{ data.value }} </p>
      </template>

      <!-- ASSET CURRENT PRICE -->
      <template #cell(formattedPrice)="data">
        <span class="cell-name">Preço</span>
        <p class="light-blue cell-value"> R${{ data.value }} </p>
      </template>

      <!-- ASSET RETURN -->
      <template #cell(formattedGain)="data">
        <span class="cell-name">Lucro</span>
        <p :class="positive(data.value)" style="font-family:'Courier New';font-size:1.2rem"> {{ round(data.value) }}% </p>
      </template>

      <!-- ASSET REMOVE -->
      <template #cell(remove)="data">
        <p></p>
        <b-icon icon="x" scale="1.3" @click="deleteRow(data.index)" variant="dark"> {{ data }} </b-icon>
      </template>
    </b-table>

    <WalletAddTickerForm @submit="addTicker" />
  </b-card-body>
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
      { key: 'image', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'amount', label: 'Qtd.', class: 'text-center' },
      { key: 'formattedPrice', label: 'Preço', class: 'text-center' },
      { key: 'formattedGain', label: 'Lucro', class: 'text-center' },
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
      let accessToken
      if (this.$auth.isAuthenticated) {
        accessToken = await this.$auth.getTokenSilently()
      }
      const wallet = await this.finance.postWallet(this.wallet, accessToken)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      let accessToken
      if (this.$auth.isAuthenticated) {
        accessToken = await this.$auth.getTokenSilently()
      }
      const { price, gain, name } = await this.finance.fetchAsset(ticker, accessToken)
      const formattedPrice = this.round(price)
      const formattedGain = this.round(gain)
      const code = ticker.toUpperCase()
      const imageLink = `https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/${code}.png`
      this.assets.push({ ticker, name, formattedPrice, formattedGain, amount, imageLink })
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

<style scoped>

.cell-value {
  font-family: 'Courier New';
  font-size: 1.05rem;
}

.cell-name {
  font-size: 0.7rem;
  color: gray;
}

.light-blue {
  color: #0275B1;
}

.text-padding {
  padding: 0rem 0.2rem;
}

</style>
