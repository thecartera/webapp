<template>
  <b-tabs>
    <b-tab v-for="w, i in wallets" :key="i" :title="w">
      <Wallet :name="w"/>
    </b-tab>

    <template #tabs-end>
      <b-nav-item @click="newWallet"> + </b-nav-item>
    </template>
  </b-tabs>
</template>

<script>
import Wallet from './Wallet'

export default {
  name: 'Wallets',

  components: { Wallet },

  data: () => ({
    wallets: ['Wallet 1'],
    totalWallets: 1
  }),

  methods: {
    newWallet (e) {
      this.totalWallets++
      this.wallets.push(`Wallet ${this.totalWallets}`)
    }
  }
}
</script>
