<template>
<b-container style="margin-top: 1rem" class="container px-0">
  <AssetInfo
    :ticker="ticker"
  />
  <b-card no-body style="border-color: #DBDAD7; margin-top: 1rem">
    <b-tabs>

      <!-- Charts -->
      <b-tab title="Gráfico" lazy>
        1
      </b-tab>

      <!-- Fundamentals -->
      <b-tab title="Índices">
        2
      </b-tab>

      <!-- -->
      <b-tab title="xx">
        3
      </b-tab>
    </b-tabs>
  </b-card>
</b-container>
</template>

<script>
import AssetInfo from '@/components/asset/subcomponents/Info'

export default {
  name: 'Wallet',

  components: {
    AssetInfo
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  }
}
</script>
