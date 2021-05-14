<template>
<b-container style="margin-top: 1rem" class="container px-0">
  <WalletInfo style="border-color: #DBDAD7" :wallet="wallet" />
  <b-card no-body style="border-color: #DBDAD7; margin-top: 1rem">
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

      <!-- Thesis -->
      <b-tab v-if="wallet.thesis" title="Tese" class="m-3" style="white-space: pre-wrap">{{ wallet.thesis }}</b-tab>

      <!-- Portfolio History -->
      <b-tab title="Histórico">
        <PortfolioHistory :id="id"/>
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
import PortfolioHistory from '@/components/wallet/PortfolioHistory'

export default {
  name: 'Wallet',

  components: {
    AssetTable,
    WalletChart,
    WalletInfo,
    PortfolioHistory
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
