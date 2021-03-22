<template>
  <b-form @keyup.enter.prevent="submit">
    <b-row>
      <b-col cols="8">
        <b-form-input v-model="ticker" placeholder="Ticker" />
      </b-col>
      <b-col cols="4">
        <b-form-input v-model="amount" placeholder="Position" />
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'WalletAddTickerForm',

  data: () => ({
    ticker: '',
    amount: 0
  }),

  methods: {
    submit () {
      const data = {
        ticker: this.ticker,
        amount: this.amount
      }

      this.$emit('submit', data)

      this.ticker = ''
      this.amount = 0
    }
  }
}
</script>
