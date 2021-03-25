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
      <b-table responsive='lg' hover :fields="fields" :items="wallet.assets">
        <template #cell(index)="data" >
          <p></p>
          <p style="font-family:'Courier New'"> {{ data.index + 1 }} </p>
        </template>
        <template #cell(imageLink)="data">
          <b-avatar :src="getImageLink(data)" size="3.2em" icon="wallet2" variant="info"></b-avatar>
        </template>
        <template #cell(nameticker)="data">
          <span style="font-size:0.8rem;color:gray"> {{ data.item.name }} </span>
          <p style="font-family:'Courier New';font-size:1.2rem"> {{ data.item.ticker.toUpperCase() }} </p>
        </template>
        <template #cell(weight)="data">
          <span style="font-size:0.8rem;color:gray">Peso</span>
          <p style="font-family:'Courier New';font-size:1.2rem;color:#0275B1">{{ round(data.value) }}%</p>
        </template>
        <template #cell(price)="data">
          <span style="font-size:0.8rem;color:gray">Preço Atual</span>
          <p style="font-family:'Courier New';font-size:1.2rem;color:#0275B1"> R$ {{ round(data.value) }} </p>
        </template>
        <template #cell(gain30d)="data">
          <span style="font-size:0.8rem;color:gray">Retorno (30 dias)</span>
          <p :class="positive(data.value)" style="font-family:'Courier New';font-size:1.2rem"> {{ round(data.value) }}% </p>
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
      // console.log(data)
      return rounded.toFixed(2)
    },

    copyLink () {
      console.log('todo')
    },

    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },

    getImageLink (data) {
      const link = data.item.ticker.toUpperCase().replace(/[0-9]/g, '')
      const imageLink = `https://pro.clear.com.br/src/assets/symbols_icons/${link}.png`
      return imageLink
    }
  }
}
</script>
