<template>
<b-container>
  <b-row align-h="center">
    <h5> Adicionar ativo </h5>
  </b-row>

  <b-row align-h="center">
    <b-form @keyup.enter.prevent="submit">
      <b-row>
        <!-- Ticker -->
        <b-col>
          <b-form-input
            v-model="ticker"
            placeholder="Código"
            @keypress="only8chars($event)"
          />
        </b-col>

        <!-- Amount -->
        <b-col>
          <b-form-input
            v-model="amount"
            @keypress="onlyNumber($event)"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Quantidade"
            trim
          />
        </b-col>

        <!-- Submit button -->
        <b-col>
          <b-button @click="submit" variant="secondary">
            <b-icon icon="plus" variant="light" />
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'WalletAddTicker',

  data: () => ({
    ticker: '',
    amount: ''
  }),

  methods: {
    submit () {
      if (this.ticker.length > 0 && this.amount.length > 0) {
        const data = {
          ticker: this.ticker.toUpperCase(),
          amount: this.amount
        }

        this.$emit('submit', data)

        this.ticker = ''
        this.amount = ''
      }
    },

    onlyNumber (evt) {
      // we only want integers.
      // using 'isNaN' lets unwanted chars like '-' and math numbers like 'e'
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      if (evt.key in numbers && this.amount.length < 8) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    only8chars (evt) {
      if (this.ticker.length < 8) {
        return true
      } else {
        evt.preventDefault()
      }
    }
  }
}
</script>
