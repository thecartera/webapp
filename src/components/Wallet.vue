<template>
  <b-card no-body style="border-color:white">
    <b-card-title>
      <b-row>
        <b-col>
          <h5 class="text-dark" style="padding: 0rem 0.2rem">
            Rendimento da carteira (30d):
            <span :class="gainColor"> {{ wallet.gain.toFixed(2) }}% </span>
          </h5>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h6 class="text-secondary" style="padding: 0rem 0.2rem"> ID desta carteira: {{ wallet.id }} </h6>
        </b-col>
      </b-row>
      <b-row>

        <b-col>
          <h6 class="text-secondary" style="padding: 0rem 0.2rem"> Criada em: {{ created }} </h6>
        </b-col>
      </b-row>
    </b-card-title>

    <b-card-body class="container px-0">
      <b-table responsive='lg' hover :fields="fields" :items="wallet.assets" small>
        <!-- ASSET IMAGE -->
        <template #cell(imageLink)="data">
          <b-avatar :src="getImageLink(data)" size="3.15em" icon="wallet2" variant="light" />
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
          <span class="cell-name"> Preço </span>
          <br>
          <span class="light-blue cell-value"> R${{ data.value.toFixed(2) }} </span>
        </template>

        <!-- ASSET RETURNS -->
        <template #cell(gain)="data">
          <span class="cell-name"> Lucro (30d) </span>
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
      { key: 'gain', label: 'Lucro', class: 'text-center', sortable: true }
    ]
  }),

  computed: {
    created () {
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
