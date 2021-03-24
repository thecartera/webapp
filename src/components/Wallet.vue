<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col>
            <h5 :class="darkGray">
              Rendimento da carteira em 30 dias:
              <span :class="gainColor"> {{ round(wallet.gain30d) }}% </span>
            </h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6 :class="lightGray"> ID desta carteira: {{ wallet.id }} </h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6 :class="lightGray"> Criada em: {{ created }} </h6>
        </b-col>
      </b-row>
    </b-card-title>

    <b-card-body>
      <b-table hover :fields="fields" :items="wallet.assets" sort-icon-left>
        <template #cell(index)="data" >
          <span style="font-family:'Courier New'"> {{ data.index + 1 }} </span>
        </template>
        <template #cell(ticker)="data">
          <span style="font-family:'Courier New'"> {{ data.value.toUpperCase() }} </span>
        </template>
        <template #cell(price)="data">
          <span style="font-family:'Courier New'"> R$ {{ round(data.value) }} </span>
        </template>
        <template #cell(weight)="data">
          <span style="font-family:'Courier New'"> {{ round(data.value) }}% </span>
        </template>
        <template #cell(gain30d)="data">
          <span :class="positive(data.value)" style="font-family:'Courier New'"> {{ round(data.value) }}% </span>
        </template>
      </b-table>
    </b-card-body>
    <!-- <b-icon-share-fill @click="copyLink"></b-icon-share-fill> -->
    <!-- <span> Copiar Link </span> -->
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
      { key: 'ticker', label: 'Código', class: 'text-left', sortable: true },
      { key: 'weight', label: 'Peso', class: 'text-left', sortable: true },
      { key: 'price', label: 'Preço Atual', class: 'text-left', sortable: true },
      { key: 'gain30d', label: 'Rendimento em 30 dias', class: 'text-left', sortable: true }
    ]
  }),

  computed: {
    created () {
      const unhandledDate = new Date(this.wallet.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    gainColor () {
      return this.wallet.gain30d < 0 ? 'text-danger' : 'text-success'
    },

    darkGray () {
      return 'text-dark'
    },

    lightGray () {
      return 'text-secondary'
    }
  },
  methods: {
    round (val, places = 2) {
      const decimals = Math.pow(10, places)
      const rounded = Math.round(val * decimals) / decimals
      return rounded.toFixed(2)
    },

    copyLink () {
      console.log('todo')
    },

    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    }
  }
}
</script>
