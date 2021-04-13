<template>
  <b-card no-body style="border-color:white">
    <b-card-title style="padding: 1rem 0rem 0rem 2rem">

      <b-row>
        <h3 class="text-dark">
          Informações da carteira
        </h3>
      </b-row>

      <b-row>
          <h6 class="text-dark"> Criador:
            <b-link :to="{ path: `/users/${username}`}" class="monneda-blue">
            @{{ username }}
            </b-link>
          </h6>
      </b-row>

      <b-row>
          <h6 class="text-dark">
            Retorno (30d):
            <span :class="gainColor"> {{ normalizedGain }}% </span>
          </h6>
      </b-row>

      <b-row>
          <span class="text-dark" style="font-size: 1rem"> Criada em: {{ createdDate }} </span>
      </b-row>

      <b-row style="padding: 0.5rem 0rem">
        <b-button size="sm" variant='outline-info' v-if="!buttonPressed" @click="pressButton"> Ver gráfico da composição </b-button>
        <b-button size="sm" variant='outline-info' v-if="buttonPressed" @click="pressButton"> Fechar gráfico </b-button>
      </b-row>

      <b-row>
        <WalletChart style="max-width: 22rem" v-if="buttonPressed" :chartData="createGraph"/>
      </b-row>

    </b-card-title>

    <b-card-body class="container px-0">
      <b-table responsive='lg' hover :fields="fields" :items="assets" small borderless>
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
    </b-card-body>
  </b-card>
</template>

<script>
import WalletChart from '@/components/WalletChart'

export default {
  name: 'Wallet',

  components: {
    WalletChart
  },

  props: {
    assets: Array,
    createdAt: String,
    gain: Number,
    id: String,
    username: String
  },

  data: () => ({
    fields: [
      { key: 'imageLink', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-center', sortable: true },
      { key: 'price', label: 'Preço', class: 'text-center', sortable: true },
      { key: 'gain', label: 'Ganho', class: 'text-center', sortable: true }
    ],
    chartData: {},
    buttonPressed: false
  }),

  computed: {
    createdDate () {
      const unhandledDate = new Date(this.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    normalizedGain () {
      if (this.gain === undefined || this.gain === null) { return '' }
      return this.gain.toFixed(2)
    },

    gainColor () {
      return this.positive(this.normalizedGain)
    },

    createGraph () {
      // IF CANT GENERATE
      if (this.gain === undefined || this.gain === null) {
        return {
          labels: ['d', 'e'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      }

      // LOGIC TO GENERATE CHART/GRAPH
      // we don't want to display too many colors in the graph, so
      // we get all the assets tickers and weights and sort them, then
      // we only take into consideration the first 15 of them, and
      // we label the rest as 'outros ativos' (other assets)

      const ticketsAndWeights = {}
      let i
      for (i = 0; i < this.assets.length; i++) {
        const asset = this.assets[i]
        ticketsAndWeights[asset.ticker] = asset.weight.toFixed(2)
      }

      const keyValues = []
      for (const key in ticketsAndWeights) {
        keyValues.push([key, ticketsAndWeights[key]])
      }

      const items = keyValues.sort(function compare (kv1, kv2) {
        // This comparison function has 3 return cases:
        // - Negative number: kv1 should be placed AFTER kv2
        // - Positive number: kv1 should be placed BEFORE kv2
        // - Zero: they are equal, any order is ok between these 2 items
        return kv2[1] - kv1[1]
      })

      let lw = items
      const nColors = 17
      if (items.length > nColors) {
        lw = items.slice(0, nColors)
      }

      const labels = []
      const weights = []
      let missingWeight = 100.0
      for (i = 0; i < lw.length; i++) {
        const assetName = lw[i][0]
        const assetWeight = lw[i][1]
        labels.push(assetName)
        weights.push(assetWeight)
        missingWeight -= assetWeight
      }

      if (items.length > nColors) {
        labels.push('Outros ativos')
        weights.push(missingWeight.toFixed(2))
      }

      return {
        labels: labels,
        datasets: [{
          label: 'Carteira',
          data: weights,
          borderColor: 'rgb(255, 255, 255)',
          borderWidth: 1,
          backgroundColor: [
            'rgb(70,125,105)',
            'rgb(155,190,135)',
            'rgb(115,195,150)',
            'rgb(230,190,130)',
            'rgb(235,215,140)',
            'rgb(225,150,95)',
            'rgb(225,100,80)',
            'rgb(200,75,80)',
            'rgb(155,55,100)',
            'rgb(80,35,115)',
            'rgb(145,100,180)',
            'rgb(225,120,165)',
            'rgb(225,90,140)',
            'rgb(85,150,195)',
            'rgb(100,100,200)',
            'rgb(96,96,96)',
            'rgb(169,169,169)',
            'rgb(232,232,232)'
          ]
        }]
      }
    }
  },

  methods: {
    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },

    getImageLink (data) {
      const code = data.item.ticker.toUpperCase()
      return `https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/${code}.png`
    },

    pressButton () {
      this.buttonPressed = !this.buttonPressed
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
