<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> {{ wallet.id }} </b-col>
        <b-col
          class="text-right"
          :class="style"
        >
          {{ monthly }}%
        </b-col>
      </b-row>
    </b-card-title>
    <b-card-sub-title> {{ created }} </b-card-sub-title>

    <b-card-body>
      <b-table hover :items="wallet.assets" />
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'Wallet',

  props: {
    wallet: {
      default: () => ({}),
      type: Object
    }
  },

  computed: {
    created () {
      return new Date(this.wallet.createdAt)
    },

    monthly () {
      return Math.round(this.wallet.monthlyGain * 100) / 100
    },

    style () {
      return this.monthly < 0 ? 'text-danger' : 'text-success'
    }
  }
}
</script>
