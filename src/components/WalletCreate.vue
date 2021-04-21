<template>
  <b-card no-body style="border-color:white">
    <b-card-body class="container px-0" body-bg-variant="light">
      <b-row>
        <!-- New wallet text -->
        <b-col>
          <div class="row justify-content-center">
          <h3 class="text-dark" style="padding: 0rem 0rem">
            Nova carteira
          </h3>
          </div>
        </b-col>

        <!-- Save button -->
        <b-col>
          <div class="row justify-content-center">
            <b-button @click="saveWallet" variant="outline-secondary">
              Salvar
            </b-button>
          </div>
        </b-col>
      </b-row>

      <!-- Add asset -->
      <div class="row justify-content-center">
        <h5 style="padding: 1.5rem 0rem 0rem 0rem">
          Adicionar ativo
        </h5>
      </div>
      <WalletAddTicker @submit="addTicker" />
    </b-card-body>

    <!-- Table -->
    <b-card-footer class="container px-0" footer-bg-variant="white">
      <b-table
        :fields="fields"
        :items="assets"
        responsive='lg'
        hover
        small
      >
        <!-- ASSET IMAGE -->
        <template #cell(image)="data">
          <div class="container px-0" style="padding: 0.5em 0em">
          <b-avatar
            rounded
            :src="data.item.imageLink"
            size="2.2em"
            icon="wallet2"
            variant="light"
          />
          </div>
        </template>

        <!-- ASSET INDEX, NAME, TICKER -->
        <template #cell(nameticker)="data">
          <div class="container px-0">
          <span class="cell-name"> {{ data.index + 1 }}. </span>
          <span class="cell-name"> {{ data.item.name }} </span>
          <br>
          <span class="cell-value"> {{ data.item.ticker.toUpperCase() }} </span>
          </div>
        </template>

        <!-- ASSET QUANTITY -->
        <template #cell(amount)="data">
          <span class="cell-name"> Qtd. </span>
          <br>
          <span class="light-blue cell-value"> {{ data.value }} </span>
        </template>

        <!-- ASSET CURRENT PRICE -->
        <template #cell(formattedPrice)="data">
          <span class="cell-name"> Preço (R$) </span>
          <br>
          <span class="light-blue cell-value"> {{ data.value }} </span>
        </template>

        <!-- ASSET RETURN -->
        <template #cell(formattedGain)="data">
          <span class="cell-name"> Lucro 30d </span>
          <br>
          <span :class="positive(data.value)" class="cell-value">
            {{ round(data.value) }}%
          </span>
        </template>

        <!-- ASSET REMOVE -->
        <template #cell(remove)="data">
          <p></p>
          <b-icon icon="x" scale="1.3" @click="deleteRow(data.index)" variant="dark">
            {{ data }}
          </b-icon>
        </template>
      </b-table>
    </b-card-footer>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'

import WalletAddTicker from '@/components/WalletAddTicker'

export default {
  name: 'WalletCreate',

  components: {
    WalletAddTicker
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
    async saveWallet () {
      const wallet = await client.wallets.postNewWallet(this.wallet)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      let data
      try {
        data = await client.assets.fetchByTicker(ticker)
      } catch (error) {
        this.showErrorToast('Ticker error', `Invalid ticker: ${ticker}`)
        return
      }

      const asset = {
        ticker: data.ticker,
        name: data.name,
        amount: amount,
        formattedPrice: this.round(data.price),
        formattedGain: this.round(data.gain),
        imageLink: await client.utils.thumbUrl(data.ticker)
      }

      this.assets.push(asset)
    },

    showErrorToast (title, message) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 3000,
        variant: 'danger'
      })
    },

    deleteRow (i) {
      this.assets.splice(i, 1)
    },

    round (val, places = 2) {
      const decimals = Math.pow(10, places)
      const rounded = Math.round(val * decimals) / decimals
      return rounded.toFixed(places)
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
  font-size: 1.05em;
}

.cell-name {
  font-size: 0.65em;
  color: gray;
}

.light-blue {
  color: #0275B1;
}

.text-padding {
  padding: 0em 0.2em;
}

</style>
