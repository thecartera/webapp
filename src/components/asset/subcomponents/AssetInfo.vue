<template>
  <b-card style="border-color: #DBDAD7" no-body>

    <b-card-body class="px-4 py-1">
      <b-row align-h="center">
        <b-button-group size="md" >
          <b-col
            v-for="(btn, idx) in periods"
            :key="idx"
            @mouseover="addHoverColor(idx)"
            @mouseleave="removeHoverColor(idx)"
            :style="btn.state ? 'text-decoration: underline; cursor: pointer' : 'cursor: pointer'"
            :pressed.sync="btn.state"
            variant="white"
            :class="btn.textColor"
            @click="onPress(idx, btn.caption)"
          >
            {{ btn.caption }}
          </b-col>
        </b-button-group>
      </b-row>
      <b-row align-h="center">
        <b-col class="p-3" cols="auto">
          <h5 :class="gain > 0 ? 'text-success' : 'text-red'">
            {{ gain > 0 ? '+' + gain : gain  }}%
          </h5>
        </b-col>
      </b-row>
      <b-row>
        <AssetChartTab
          :days="selectedPeriod"
          :ticker="ticker"
        />
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'
import AssetChartTab from '@/components/asset/subcomponents/AssetChartTab'

export default {
  name: 'AssetInfo',

  components: {
    AssetChartTab
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    loading: true,
    asset: Object,
    selectedPeriod: 30,
    periods: [
      { caption: '7D', state: false, textColor: 'text-secondary' },
      { caption: '1M', state: true, textColor: 'text-secondary' },
      { caption: '3M', state: false, textColor: 'text-secondary' },
      { caption: 'YTD', state: false, textColor: 'text-secondary' }
    ]
  }),

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    gain () {
      if (this.loading) {
        return 0.00
      }
      return this.asset.gain.toFixed(2)
    },
    name () {
      if (this.loading) {
        return 'name'
      }
      return this.asset.name.toLocaleLowerCase()
    },
    price () {
      if (this.loading) {
        return 0.00
      }
      return this.asset.price.toFixed(2)
    }
  },

  methods: {
    async fetchAsset () {
      try {
        this.asset = await client.assets.fetchByTicker(this.ticker, this.selectedPeriod)
        this.updateTextColor()
      } catch {
        await this.$router.push('/feed')
      }
    },
    updateTextColor () {
      this.periods.forEach((b) => {
        if (b.state) {
          b.textColor = this.gain > 0 ? 'text-success' : 'text-red'
        } else {
          b.textColor = 'text-secondary'
        }
      })
    },
    getYTD () {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const diff = now - start
      const oneDay = 1000 * 60 * 60 * 24
      const day = Math.floor(diff / oneDay)
      return day
    },
    async onPress (i, caption) {
      switch (caption) {
        case '7D':
          this.selectedPeriod = 7
          break
        case '1M':
          this.selectedPeriod = 30
          break
        case '3M':
          this.selectedPeriod = 90
          break
        default:
          this.selectedPeriod = this.getYTD()
          break
      }
      await this.fetchAsset()
      this.periods.forEach((b, index) => {
        b.state = i === index
        if (i === index) {
          if (this.gain > 0) {
            b.textColor = 'text-success'
          } else {
            b.textColor = 'text-red'
          }
        } else {
          b.textColor = 'text-secondary'
        }
      })
    },

    addHoverColor (id) {
      if (this.periods[id].state === false) {
        if (this.gain > 0) {
          this.periods[id].textColor = 'text-success'
        } else {
          this.periods[id].textColor = 'text-red'
        }
      }
    },

    removeHoverColor (id) {
      if (this.periods[id].state === false) {
        this.periods[id].textColor = 'text-secondary'
      }
    }
  },

  watch: {
    ticker () { // watch if opening another asset
      this.loading = true
      this.fetchAsset()
      this.loading = false
    }
  },

  async created () {
    this.asset = await client.assets.fetchByTicker(this.ticker, this.selectedPeriod)
    this.loading = false
    this.updateTextColor()
  }
}
</script>
