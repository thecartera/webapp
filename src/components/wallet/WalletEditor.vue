<template>
<b-card no-body border-variant="white">
  <!-- Name input -->
  <b-card-header>
    <b-row align-h="around" style="margin-bottom:1rem">
      <!-- Cancel button -->
      <b-button @click="cancelEdit" variant="outline-secondary">
        Cancelar
      </b-button>
      <!-- Save button -->
      <b-button @click="saveWallet" variant="success">
        Salvar
      </b-button>
    </b-row>

    <!-- Wallet name input -->
    <b-row>
      <b-col>
        <b-form-input
          v-model="walletName"
          :state="walletNameValid"
          placeholder="Dê um nome para sua carteira"
        />
      </b-col>
    </b-row>
  </b-card-header>

  <!-- Inputs -->
  <b-card-body body-bg-variant="light">
    <b-tabs>
      <b-tab title="Composição">
        <WalletAddTicker index="assets" :hits="4" class="mt-2" @submit="addTicker" />
      </b-tab>
      <b-tab class="mt-2" title="Descrição" v-if="walleta.description !== undefined">
        <WalletAddDescription :receivedDescription="walleta.description" @update="addDescription" />
      </b-tab>
    </b-tabs>
  </b-card-body>

  <!-- Table -->
  <b-card-footer class="px-0" footer-bg-variant="white">
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
        <b-row align-h="center">
        <b-form-input size="sm" class="cell-value" style="width:6rem"
          v-model="data.value"
          @change="updateQuantity(data.item.ticker, data.value)"
          @keypress="validateQuantity($event, data.value)"
        />
        </b-row>
      </template>

      <!-- ASSET CURRENT PRICE -->
      <template #cell(formattedPrice)="data">
        <span class="cell-name"> Preço hoje </span>
        <br>
        <span class="text-primary cell-value"> {{ data.value }} </span>
      </template>

      <!-- ASSET RETURN -->
      <template #cell(formattedGain)="data">
        <span class="cell-name"> Variação 30d </span>
        <br>
        <span :class="positive(data.value)" class="cell-value">
          {{ data.value }}%
        </span>
      </template>

      <!-- ASSET REMOVE -->
      <template #cell(remove)="data">
        <br>
        <b-icon icon="x" @click="deleteRow(data.index)" scale="1.5" variant="dark">
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
  name: 'WalletEditor',

  components: {
    WalletAddTicker,
    WalletAddDescription
  },

  data: () => ({
    fields: [
      { key: 'image', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'amount', label: 'Qtd.', class: 'text-center' },
      { key: 'formattedPrice', label: 'Preço (R$)', class: 'text-center' },
      { key: 'formattedGain', label: 'Variação', class: 'text-center d-none d-md-block' },
      { key: 'remove', label: '', class: 'text-center' }
    ],
    assets: [],
    walletName: '',
    walletDescription: '',
    walleta: {}
  }),

  props: {
    id: {
      type: String,
      required: true
    }
  },

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
      const wallet = await client.wallets.updateWallet(this.wallet, this.walleta.id)
      this.$router.push(`/c/${wallet.id}`)
    },

    cancelEdit () {
      this.$router.push(`/c/${this.walleta.id}`)
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
        formattedPrice: data.price.toFixed(2),
        formattedGain: data.gain.toFixed(2),
        imageLink: await client.utils.thumbUrl(data.ticker)
      }

      this.assets.unshift(asset)
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

    updateQuantity (ticker, newQtd) {
      for (let i = 0; i < this.assets.length; i++) {
        if (this.assets[i].ticker === ticker) {
          this.assets[i].amount = newQtd
        }
      }
    },

    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },

    validateQuantity (evt, newQtd) {
      // we only want integers.
      // using 'isNaN' lets unwanted chars like '-' and math numbers like 'e'
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      if (evt.key in numbers && String(newQtd).length < 8) {
        return true
      } else {
        evt.preventDefault()
      }
    }
  },

  async created () {
    this.walleta = await client.wallets.fetchMyById(this.id)
    const tempAssets = []

    for (let i = 0; i < this.walleta.assets.length; i++) {
      const ticker = this.walleta.assets[i].ticker
      const amount = this.walleta.assets[i].amount
      const price = this.walleta.assets[i].price
      const name = this.walleta.assets[i].name
      const gain = this.walleta.assets[i].gain

      const asset = {
        ticker: ticker,
        name: name,
        amount: amount,
        formattedPrice: price.toFixed(2),
        formattedGain: gain.toFixed(2),
        imageLink: await client.utils.thumbUrl(ticker)
      }
      tempAssets.push(asset)
    }
    this.assets = tempAssets
    this.walletName = this.walleta.name
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
