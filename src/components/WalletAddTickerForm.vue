<template>
  <b-form @keyup.enter.prevent="submit">
    <b-form-row>
      <b-col>
        <b-form-input v-model="ticker" placeholder="Código" />
      </b-col>
      <b-col>
        <!-- <b-form-input @keypress="onlyNumber($event)" v-model.number="amount" placeholder="Quantidade" /> -->
        <b-form-input
          id="input-live"
          v-model="amount"
          :state="nameState"
          @keypress="onlyNumber($event)"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Qtd."
          trim
        ></b-form-input>
      </b-col>
      <b-col>
        <b-button @click="submit">Adicionar</b-button>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
export default {
  name: 'WalletAddTickerForm',

  data: () => ({
    ticker: '',
    amount: ''
  }),

  computed: {
    nameState () {
      if (this.amount === '') {
        return 'null'
      }
      return (this.amount.length < 10)
    }
  },

  methods: {
    submit () {
      if (this.ticker.length > 0 && this.amount.length > 0) {
        const data = { ticker: this.ticker.toUpperCase(), amount: this.amount }

        this.$emit('submit', data)

        this.ticker = ''
        this.amount = ''
      }
    },

    onlyNumber (evt) {
      // console.log(evt)
      // we only want integers.
      // using 'isNaN' lets unwanted chars like '-' and math numbers like 'e'
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      if (evt.key in numbers && this.amount.length < 9) {
        return true
      } else {
        evt.preventDefault()
      }
    }
  }
}
</script>
