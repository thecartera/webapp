<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> {{ name }} </b-col>
        <b-col class="text-right">
          <b-button variant="info" v-b-modal="name"> + </b-button>
        </b-col>
      </b-row>
    </b-card-title>

    <b-table hover :items="items" />

    <b-modal :ref="name" :id="name" @ok="newStock">
      <b-form @submit="newStock">
        <b-form-input v-model="stock" trim placeholder="Stock code"></b-form-input>
      </b-form>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  name: 'Wallet',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  data: () => ({
    items: [
      { code: 'AAPL34', name: 'Apple DBR', position: 5.3, monthly: 4.4 },
      { code: 'BBAS3', name: 'Banco do Brasil', position: 7.5, monthly: 3.8 },
      { code: 'PIBB11', name: 'ETF B3', position: 12.5, monthly: 3.6 },
      { code: 'VVAR3', name: 'Via Varejo', position: 5.3, monthly: 3.4 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'CPLE6', name: 'Copel Energia', position: 1.4, monthly: 2.4 }
    ],

    stock: ''
  }),

  methods: {
    newStock (e) {
      e.preventDefault()
      this.items.push({ code: this.stock, position: 0.0, monthly: 0.0 })
      this.stock = ''
      this.$refs[this.name].hide()
    }
  }
}
</script>
