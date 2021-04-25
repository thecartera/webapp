<template>
<b-container class="container px-0">
  <WalletInfo class="border-white" :wallet="wallet" />
  <b-card no-body class="border-white">
    <b-tabs>
      <!-- Table -->
      <b-tab title="Tabela">
        <AssetTable :assets="wallet.assets"/>
      </b-tab>

      <!-- Chart -->
      <b-tab title="Gráfico" lazy>
        <WalletChart
          class="mx-auto"
          style="max-width: 23rem"
          :assets="wallet.assets"
        />
      </b-tab>

      <!-- Description -->
      <b-tab v-if="wallet.description" title="Descrição" class="m-3">
        {{ wallet.description }}
      </b-tab>
    </b-tabs>
  </b-card>
</b-container>
</template>

<script>
import client from '@/commons/client.api'

import AssetTable from '@/components/wallet/Table'
import WalletChart from '@/components/wallet/Chart'
import WalletInfo from '@/components/wallet/Info'

export default {
  name: 'Wallet',

  components: {
    AssetTable,
    WalletChart,
    WalletInfo
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    wallet: {}
  }),

  watch: {
    id: async function (newVal) {
      this.wallet = await client.wallets.fetchById(newVal)
    }
  },

  async created () {
    this.wallet = await client.wallets.fetchById(this.id)
  }
}
</script>
