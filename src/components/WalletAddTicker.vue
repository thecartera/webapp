<template>
  <!-- Add asset -->
  <div>
    <div class="row justify-content-center">
      <h5 style="padding: 1.5rem 0rem 0rem 0rem">
        Adicionar ativo
      </h5>
    </div>
    <b-form @keyup.enter.prevent="submit">
      <b-row style="justify-content:center">
        <div style="padding: 0rem 0.4rem">
          <b-form-input
            v-model="ticker"
            placeholder="Código"
            style="width:7rem"
            @keypress="only8chars($event)"
          />
        </div>
        <b-form-input
          id="input-live"
          v-model="amount"
          @keypress="onlyNumber($event)"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Quantidade"
          trim
          style="width:7rem"
        />
        <div style="padding: 0rem 0.4rem">
          <b-button @click="submit" variant="secondary">
            <b-icon icon="plus" variant="light"></b-icon>
          </b-button>
        </div>
      </b-row>
    </b-form>
  </div>

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
