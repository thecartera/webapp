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

    <b-table hover :items="tickers" />

    <b-card-footer>
      <b-button @click="saveWallet"> Save </b-button>
    </b-card-footer>

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
    tickers: [],
    stock: ''
  }),

  methods: {
    saveWallet (e) {
      const wallet = { tickers: this.tickers.map(i => i.codneg) }
      this.finance.save(wallet)
        .then(r => r.json())
        .then(console.log)
    },

    newStock (e) {
      e.preventDefault()
      this.finance.quote(this.stock)
        .then(r => r.json())
        .then(r => this.tickers.push(r))
      this.stock = ''
      this.$refs[this.name].hide()
    }
  }
}
</script>
