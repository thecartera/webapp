<template>
<b-card no-body border-variant="white">
  <!-- Name input -->
  <b-card-header>
    <b-row>
      <!-- Wallet name input -->
      <b-col cols="7">
        <b-form-input
          v-model="walletName"
          :state="walletNameValid"
          placeholder="Nome da carteira"
        />
      </b-col>

      <!-- Save button -->
      <b-col class="text-center">
        <b-button @click="saveWallet" variant="outline-secondary">
          Salvar
        </b-button>
      </b-col>
    </b-row>
  </b-card-header>

  <!-- Inputs -->
  <b-card-body body-bg-variant="light">
    <b-tabs>
      <b-tab title="Composição">
        <WalletAddTicker index="assets" :hits="4" class="mt-2" @submit="addTicker" />
      </b-tab>
      <b-tab class="mt-2" title="Descrição">
        <WalletAddDescription @update="addDescription" />
      </b-tab>
    </b-tabs>
  </b-card-body>

  <!-- Table -->
  <b-card-footer class="p-0">
    <b-table
      :fields="fields"
      :items="assets"
      responsive='lg'
      hover
      small
      borderless
    >
      <!-- ASSET IMAGE -->
      <template #cell(image)="data">
        <b-avatar
          rounded
          class="mt-1"
          icon="wallet2"
          variant="white"
          :src="data.item.imageLink"
        />
      </template>

      <!-- ASSET INDEX, NAME, TICKER -->
      <template #cell(nameticker)="data">
        <span class="cell-name"> {{ data.index + 1 }}. {{ data.item.name }} </span>
        <br>
        <span class="cell-value"> {{ data.item.ticker.toUpperCase() }} </span>
      </template>

      <!-- ASSET QUANTITY -->
      <template #cell(amount)="data">
        <span class="cell-name"> Qtd. </span>
        <br>
        <span class="cell-value"> {{ data.value }} </span>
      </template>

      <!-- ASSET CURRENT PRICE -->
      <template #cell(formattedPrice)="data">
        <span class="cell-name"> Preço (R$) </span>
        <br>
        <span class="text-primary cell-value"> {{ data.value }} </span>
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
        <br>
        <b-icon icon="x" @click="deleteRow(data.index)" variant="dark">
          {{ data }}
        </b-icon>
      </template>
    </b-table>
  </b-card-footer>
</b-card>
</template>

<script>
import client from '@/commons/client.api'

import WalletAddTicker from '@/components/wallet/subcomponents/WalletAddTicker'
import WalletAddDescription from '@/components/wallet/subcomponents/WalletAddDescription'

export default {
  name: 'WalletCreate',

  components: {
    WalletAddTicker,
    WalletAddDescription
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
    walletName: '',
    walletDescription: ''
  }),

  computed: {
    wallet () {
      return {
        name: this.walletName,
        description: this.walletDescription,
        assets: this.assets.map(({ ticker, amount }) => ({ ticker, amount }))
      }
    },

    walletNameValid () {
      return this.walletName.length > 2 && this.walletName.length < 41
    }
  },

  methods: {
    async saveWallet () {
      if (this.assets.length === 0) {
        this.showErrorToast('Ops!', 'Adicione algum ativo à sua carteira')
        return
      }
      if (!this.walletNameValid) {
        this.showErrorToast('Ops!', 'Dê um nome à sua carteira')
        return
      }
      const wallet = await client.wallets.postNewWallet(this.wallet)
      this.$router.push(`/wallets/${wallet.id}`)
    },

    async addTicker ({ ticker, amount }) {
      // checks if ticker already exists in the current wallet
      for (const [, value] of Object.entries(this.wallet.assets)) {
        if (value.ticker === ticker) {
          this.showErrorToast('Ops!', `Você já adicionou ${ticker} à sua carteira.`)
          return
        }
      }

      // fetches the ticker data from the dabase and alerts user if data not found
      let data
      try {
        data = await client.assets.fetchByTicker(ticker)
      } catch (error) {
        this.showErrorToast('Ops!', `Código não existente: ${ticker}`)
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

    addDescription (evt) {
      this.walletDescription = evt
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
</style>
