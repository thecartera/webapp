<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col>
          <h5 class="text-dark">
            Rendimento da carteira em 30 dias:
            <span :class="gainColor"> {{ wallet.gain30d.toFixed(2) }}% </span>
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

    <b-card-body>
      <b-table responsive='lg' hover :fields="fields" :items="wallet.assets">
        <template #cell(index)="data" >
          <p></p>
          <p> {{ data.index + 1 }} </p>
        </template>

        <template #cell(imageLink)="data">
          <b-avatar :src="getImageLink(data)" size="3.2em" icon="wallet2" variant="info" />
        </template>

        <template #cell(nameticker)="data">
          <span class="cell-name"> {{ data.item.name }} </span>
          <p class="cell-value"> {{ data.item.ticker.toUpperCase() }} </p>
        </template>

        <template #cell(weight)="data">
          <span class="cell-name"> Peso </span>
          <p class="light-blue cell-value"> {{ data.value.toFixed(2) }}% </p>
        </template>

        <template #cell(price)="data">
          <span class="cell-name"> Preço Atual </span>
          <p class="light-blue cell-value"> R$ {{ data.value.toFixed(2) }} </p>
        </template>

        <template #cell(gain30d)="data">
          <span class="cell-name"> Retorno (30 dias) </span>
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
      { key: 'index', label: ' ', class: 'text-left' },
      { key: 'imageLink', label: '', class: 'text-left' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-center', sortable: true },
      { key: 'price', label: 'Preço Atual', class: 'text-center', sortable: true },
      { key: 'gain30d', label: 'Rendimento', class: 'text-center', sortable: true }
    ]
  }),

  computed: {
    created () {
      const unhandledDate = new Date(this.wallet.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    gainColor () {
      return this.positive(this.wallet.gain30d)
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
  font-size: 1.2rem;
}

.cell-name {
  font-size: 0.8rem;
  color: gray;
}

.light-blue {
  color: #0275B1;
}

</style>
