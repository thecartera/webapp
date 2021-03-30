<template>
  <b-card no-body style="border-color:white">
    <b-card-title>
      <b-row>
        <b-col>
          <h5 class="text-dark">
            Rendimento da carteira em 30 dias:
            <span :class="gainColor"> {{ wallet.gain.toFixed(2) }}% </span>
          </h5>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h6 class="text-secondary"> ID desta carteira: {{ wallet.id }} </h6>
        </b-col>
      </b-row>
      <b-row>

        <b-col>
          <h6 class="text-secondary"> Criada em: {{ created }} </h6>
        </b-col>
      </b-row>
    </b-card-title>

    <b-card-body class="container px-0">
      <b-table responsive='lg' hover :fields="fields" :items="wallet.assets" small>
        <template #cell(imageLink)="data">
          <b-avatar :src="getImageLink(data)" size="3.15em" icon="wallet2" variant="light" />
        </template>

        <template #cell(nameticker)="data">
          <span class="cell-name"> {{ data.index + 1 }}. </span>
          <span class="cell-name"> {{ data.item.name }} </span>
          <p class="cell-value"> {{ data.item.ticker.toUpperCase() }} </p>
        </template>

        <template #cell(weight)="data">
          <span class="cell-name"> Peso </span>
          <p class="light-blue cell-value"> {{ data.value.toFixed(1) }}% </p>
        </template>

        <template #cell(price)="data">
          <span class="cell-name"> Preço </span>
          <p class="light-blue cell-value"> R$ {{ data.value.toFixed(2) }} </p>
        </template>

        <template #cell(gain)="data">
          <span class="cell-name"> Retorno (30d) </span>
          <p :class="positive(data.value)" class="cell-value"> {{ data.value.toFixed(2) }}% </p>
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
      { key: 'gain', label: 'Retorno', class: 'text-center', sortable: true }
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
  font-size: 1.1rem;
}

.cell-name {
  font-size: 0.75rem;
  color: gray;
}

.light-blue {
  color: #0275B1;
}

</style>
