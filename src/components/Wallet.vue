<template>
  <b-card no-body style="border-color:white">
    <b-card-title style="padding: 1rem 0rem 0rem 2rem">
      <!-- Title -->
      <b-row>
        <h3 class="text-dark"> Informações da carteira </h3>
      </b-row>

      <!-- Creator -->
      <b-row>
        <h6 class="text-dark"> Criador:
          <b-link :to="`/users/${wallet.username}`" class="monneda-blue">
          @{{ wallet.username }}
          </b-link>
        </h6>
      </b-row>

      <!-- Profit -->
      <b-row>
        <h6 class="text-dark">
          Retorno (30d):
          <span :class="gainColor"> {{ normalizedGain }}% </span>
        </h6>
      </b-row>

      <!-- Creation date -->
      <b-row>
        <span class="text-dark" style="font-size: 1rem">
          Criada em: {{ createdDate }}
        </span>
      </b-row>
    </b-card-title>

    <b-card-body class="container px-0">
      <b-tabs>
        <!-- Table -->
        <b-tab title="Tabela">
          <b-table responsive='lg' hover :fields="fields" :items="wallet.assets" small borderless>
            <!-- ASSET IMAGE -->
            <template #cell(imageLink)="data">
              <div class="container px-0" style="padding: 0.5em 0em">
              <b-avatar rounded :src="getImageLink(data)" size="2.2em" icon="wallet2" variant="light" />
              </div>
            </template>

            <!-- ASSET INDEX, NAME, TICKER -->
            <template #cell(nameticker)="data">
              <span class="cell-name"> {{ data.index + 1 }}. </span>
              <span class="cell-name"> {{ data.item.name }} </span>
              <br>
              <span class="cell-value"> {{ data.item.ticker.toUpperCase() }} </span>
            </template>

            <!-- ASSET WEIGHT IN PORTFOLIO -->
            <template #cell(weight)="data">
              <span class="cell-name"> Peso </span>
              <br>
              <span class="monneda-blue cell-value"> {{ data.value.toFixed(1) }}% </span>
            </template>

            <!-- ASSET CURRENT PRICE -->
            <template #cell(price)="data">
              <span class="cell-name">Preço (R$)</span>
              <br>
              <span class="monneda-blue cell-value">{{ data.value.toFixed(2) }}</span>
            </template>

            <!-- ASSET RETURNS -->
            <template #cell(gain)="data">
              <span class="cell-name"> Ganho 30d </span>
              <br>
              <span :class="positive(data.value)" class="cell-value"> {{ data.value.toFixed(2) }}% </span>
            </template>
          </b-table>
        </b-tab>

        <!-- Chart -->
        <b-tab title="Gráfico" lazy>
          <WalletChart style="margin-left: auto; margin-right: auto; max-width: 30rem" :assets="wallet.assets"/>
        </b-tab>
      </b-tabs>
    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'

import WalletChart from '@/components/WalletChart'

export default {
  name: 'Wallet',

  components: {
    WalletChart
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    fields: [
      { key: 'imageLink', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-center', sortable: true },
      { key: 'price', label: 'Preço', class: 'text-center', sortable: true },
      { key: 'gain', label: 'Ganho', class: 'text-center', sortable: true }
    ],
    wallet: {}
  }),

  computed: {
    createdDate () {
      const unhandledDate = new Date(this.wallet.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    normalizedGain () {
      if (this.wallet.gain === undefined || this.wallet.gain === null) { return '' }
      return this.wallet.gain.toFixed(2)
    },

    gainColor () {
      return this.positive(this.normalizedGain)
    }
  },

  methods: {
    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },

    getImageLink (data) {
      const code = data.item.ticker.toUpperCase()
      return `https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/${code}.png`
    }
  },

  watch: {
    id: async function (newVal) { // watch if opening another wallet
      this.wallet = await client.wallets.fetchById(newVal)
    }
  },

  async created () {
    this.wallet = await client.wallets.fetchById(this.id)
  }
}
</script>

<style scoped>
.cell-value {
  font-family: 'Courier New';
  font-size: 1.05rem;
}

.cell-name {
  font-size: 0.65rem;
  color: gray;
}

.monneda-blue {
  color: #0275B1;
}

.text-padding {
  padding: 0rem 0.2rem;
}
</style>
