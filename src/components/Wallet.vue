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
            <a :href="`/#/users/${wallet.username}`" class="light-blue">
            @{{ wallet.username }}
            </a>
          </h6>
      </b-row>

      <b-row>
          <h6 class="text-dark">
            Retorno (30d):
            <span :class="gainColor"> {{ wallet.gain.toFixed(2) }}% </span>
          </h6>
      </b-row>

      <b-row>
          <span class="text-dark" style="font-size: 1rem"> Criada em: {{ createdDate }} </span>
      </b-row>
    </b-card-title>
    <b-card-body class="container px-0">
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
          <span class="light-blue cell-value"> {{ data.value.toFixed(1) }}% </span>
        </template>

        <!-- ASSET CURRENT PRICE -->
        <template #cell(price)="data">
          <span class="cell-name">Preço (R$)</span>
          <br>
          <span class="light-blue cell-value">{{ data.value.toFixed(2) }}</span>
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
export default {
  name: 'Wallet',

  props: {
    wallet: {
      default: () => ({ assets: [] }),
      type: Object
    }
  },

  data: () => ({
    fields: [
      { key: 'imageLink', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-center', sortable: true },
      { key: 'price', label: 'Preço', class: 'text-center', sortable: true },
      { key: 'gain', label: 'Ganho', class: 'text-center', sortable: true }
    ]
  }),

  computed: {
    createdDate () {
      const unhandledDate = new Date(this.wallet.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    gainColor () {
      return this.positive(this.wallet.gain)
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

.light-blue {
  color: #0275B1;
}

.text-padding {
  padding: 0rem 0.2rem;
}

</style>
