<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col>
            <h5 :class="darkGray">
              Retorno da carteira no mês:
              <span :class="gainColor"> {{ round(wallet.monthlyGain) }}% </span>
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
        <template #cell(ticker)="data">
          <span style="font-family:'Courier New'"> {{ data.value.toUpperCase() }} </span>
        </template>
        <template #cell(price)="data">
          <span style="font-family:'Courier New'"> R$ {{ round(data.value).toFixed(2) }} </span>
        </template>
        <template #cell(weight)="data">
          <span style="font-family:'Courier New'"> {{ round(data.value).toFixed(2) }}% </span>
        </template>
        <template #cell(monthlyGain)="data">
          <span :class="positive(data.value)" style="font-family:'Courier New'"> {{ round(data.value).toFixed(2) }}% </span>
          </template>
        <template #cell(date)="data">
          <span style="font-family:'Courier New'"> {{ new Date(data.value).toLocaleString('pt-BR').split(' ')[0] }} </span>
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
      { key: 'ticker', label: 'Código', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-left', sortable: true },
      { key: 'price', label: 'Preço Atual', class: 'text-left', sortable: true },
      { key: 'date', label: 'Data', class: 'text-left', sortable: true },
      { key: 'monthlyGain', label: 'Rendimento no mês', class: 'text-left', sortable: true }
    ]
  }),

  computed: {
    created () {
      const unhandledDate = new Date(this.wallet.createdAt)
      return unhandledDate.toLocaleString('pt-BR').split(' ')[0]
    },

    gainColor () {
      return this.wallet.monthlyGain < 0 ? 'text-danger' : 'text-success'
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
      return Math.round(val * decimals) / decimals
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
