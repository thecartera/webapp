<template>
<b-container style="margin-top: 1rem" class="container px-0">
  <b-card no-body style="border-color: #DBDAD7; margin-top: 1rem">
    <AssetHeader
      :ticker="ticker"
      v-if="ticker"
    />
    <b-tabs card end pills align="center" active-nav-item-class="bg-primary">

      <!-- Charts -->
      <b-tab title="Gráfico" no-body>
        <AssetInfo
          :ticker="ticker"
          v-if="ticker"
        />
      </b-tab>

      <!-- About -->
      <b-tab title="Sobre" no-body>
        <AssetIndustry
          :ticker="ticker"
          v-if="ticker"
        />
      </b-tab>

    </b-tabs>
  </b-card>
</b-container>
</template>

<script>
import AssetHeader from '@/components/asset/subcomponents/AssetHeader'
import AssetInfo from '@/components/asset/subcomponents/AssetInfo'
import AssetIndustry from '@/components/asset/subcomponents/AssetIndustry'

export default {
  name: 'Asset',

  components: {
    AssetHeader,
    AssetInfo,
    AssetIndustry
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  async created () {
    this.loading = false
  }
}
</script>
