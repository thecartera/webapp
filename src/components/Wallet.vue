<template>
  <b-card>
    <b-card-title>
      <b-row>
        <b-col> {{ wallet.id }} </b-col>
      </b-row>
    </b-card-title>

    <b-table hover :items="wallet.assets" />
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
  }
}
</script>
