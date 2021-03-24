<template>
  <b-form @keyup.enter.prevent="submit">
    <b-row>
      <b-col cols="4">
        <b-form-input v-model="ticker" placeholder="Código" />
      </b-col>
      <b-col cols="4">
        <!-- <b-form-input @keypress="onlyNumber($event)" v-model.number="amount" placeholder="Quantidade" /> -->
        <b-form-input
          id="input-live"
          v-model="quantity"
          :state="nameState"
          @keypress="onlyNumber($event)"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Quantidade"
          trim
        ></b-form-input>
      </b-col>
      <b-col>
        <b-button @click="submit"> Adicionar </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'WalletAddTickerForm',

  data: () => ({
    ticker: '',
    amount: '',
    quantity: ''
  }),

  computed: {
    nameState () {
      if (this.quantity === '') {
        return 'null'
      }
      return (this.quantity.length < 10)
    }
  },

  methods: {
    submit () {
      const data = { ticker: this.ticker.toUpperCase(), amount: this.amount }

      this.$emit('submit', data)

      this.ticker = ''
      this.amount = ''
    },

    onlyNumber (evt) {
      // console.log(evt)
      // we only want integers.
      // using 'isNaN' lets unwanted chars like '-' and math numbers like 'e'
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      if (evt.key in numbers && this.quantity.length < 9) {
        return true
      } else {
        evt.preventDefault()
      }
    }
  }
}
</script>
