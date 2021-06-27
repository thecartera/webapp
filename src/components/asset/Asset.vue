<template>
<b-container style="margin-top: 1rem" class="container px-0">
  <AssetInfo
    :ticker="ticker"
    v-if="ticker"
  />
  <b-card no-body style="border-color: #DBDAD7; margin-top: 1rem">
    <b-tabs>

      <!-- Charts -->
      <b-tab title="Gráfico" class="px-4 py-2">
        <b-row>
          (grafico)
        </b-row>
        <b-row>
          <span class="pr-1"> Ver no </span>
          <b-link
          :href="`https://tvc6.investing.com/init.php?family_prefix=tvc6&
          time=1624737102&
          domain_ID=30&
          lang_ID=12&
          timezone_ID=12&
          pair_ID=${getCode(ticker)}&
          interval=86400&
          refresh=24&
          session=session&
          user=guest&
          width=1000&
          height=1000&
          init_page=live-charts`"
          >
            Trading View
          </b-link>
          <span class="pl-1"> da Br Investing </span>
        </b-row>
      </b-tab>

      <!-- xx -->
      <b-tab title="xx" class="px-4 py-2">
        xx
      </b-tab>

      <!-- yy -->
      <b-tab title="yy" class="px-4 py-2">
        yy
      </b-tab>
    </b-tabs>
  </b-card>
</b-container>
</template>

<script>
import AssetInfo from '@/components/asset/subcomponents/Info'
import client from '@/commons/client.api'

export default {
  name: 'Asset',

  components: {
    AssetInfo
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  methods: {
    getCode (ticker) {
      return client.utils.getCode(ticker)
    }
  }
}
</script>
