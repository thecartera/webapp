<template>
<b-container style="margin-top: 1rem" class="container px-0">
  <WalletInfo
    :wallet="wallet"
    :showValues='showValues'
    @changeSelectedPeriod="changeSelectedPeriod"
  />
  <b-card no-body style="border-color: #DBDAD7; margin-top: 1rem">
    <b-tabs>
      <!-- Table -->
      <b-tab title="Tabela">
        <AssetTable
          :assets="wallet.assets"
          :show='showValues'
          :selectedPeriod="days"
        />
      </b-tab>

      <!-- Chart -->
      <b-tab title="Gráfico" lazy>
        <b-row class="mt-2" align-h="center">
          <h5 class="mb-2"> Composição por ativo </h5>
        </b-row>
        <b-row>
          <WalletChart
            class="mx-auto"
            style="max-width: 23rem"
            :assets="wallet.assets"
          />
        </b-row>
        <b-row class="mt-5" align-h="center">
          <h5 class="mb-2"> Composição por setores </h5>
        </b-row>
        <b-row>
          <WalletSectorChart
            class="mx-auto"
            style="max-width: 23rem"
            :assets="wallet.assets"
          />
        </b-row>
      </b-tab>

      <!-- Thesis -->
      <b-tab
        v-if="wallet.thesis"
        title="Tese"
        class="m-3"
        style="white-space: pre-wrap"
      >
        {{ wallet.thesis }}
      </b-tab>

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

import AssetTable from '@/components/wallet/subcomponents/Table'
import WalletChart from '@/components/wallet/subcomponents/Chart'
import WalletSectorChart from '@/components/wallet/subcomponents/SectorChart'
import WalletInfo from '@/components/wallet/subcomponents/Info'
import PortfolioHistory from '@/components/wallet/subcomponents/PortfolioHistory'

export default {
  name: 'Wallet',

  components: {
    AssetTable,
    WalletChart,
    WalletSectorChart,
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
    wallet: {},
    days: 30,
    showValues: false
  }),

  methods: {
    changeSelectedPeriod (newPeriod) {
      this.days = newPeriod
      this.fetchWallet(this.id)
      this.showValues = true
    },
    async fetchWallet (id) {
      try {
        this.wallet = await client.wallets.fetchById(id, this.days)
        this.showValues = true
      } catch {
        console.error('error fetching wallet')
      }
    }
  },

  watch: {
    id: async function (newId) {
      this.fetchWallet(newId)
    }
  },

  async created () {
    try {
      this.wallet = await client.wallets.fetchById(this.id, this.days)
    } catch {
      this.$router.replace('/walletNotFound')
    }
  }
}
</script>
