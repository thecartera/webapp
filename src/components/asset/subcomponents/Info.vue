<template>
  <b-card style="border-color: #DBDAD7" no-body>
    <b-card-header class="pt-1 pb-1 m-0">
      <b-row>
        <b-col cols="auto" class="pl-0 pr-0">
          <b-avatar
            rounded
            :src="thumb"
            size="md"
          />
        </b-col>
        <b-col class="pl-4" style="line-height:1.35rem">
          <b-row>
            <span> {{ ticker }} </span>
            <span class="text-secondary text-capitalize pl-2"> | {{ name }} </span>
          </b-row>
          <b-row>
            <span class="font-weight-bold"> R${{ price }}</span>
          </b-row>
        </b-col>
        <b-col>
          <b-row align-h="end" class="pt-1 pr-1">
            <b-dropdown no-caret right variant="outline-light">
              <template #button-content>
                <b-icon
                  icon="three-dots-vertical"
                  scale="1"
                  style="cursor: pointer"
                  variant="dark"
                />
              </template>

              <!-- SHARE BUTTONS -->
              <Socials title="Da uma olhada nesse ativo!" :url="`https://cartera.com.br/#/assets/${ticker}`"/>
            </b-dropdown>
          </b-row>
        </b-col>
      </b-row>
    </b-card-header>

    <b-card-body class="px-4 py-1">
      <b-row>
        <b-button-group size="sm" >
          <b-button
            v-for="(btn, idx) in periods"
            :key="idx"
            pill
            :pressed.sync="btn.state"
            variant="white"
            :class="activeClass(btn.state)"
            @click="onPress(idx, btn.caption)"
          >
            {{ btn.caption }}
          </b-button>
        </b-button-group>
      </b-row>
      <b-row>
        <b-col class="p-2" cols="auto">
          <PerformanceCircle :pctChange="parseFloat(gain)"/>
        </b-col>
      </b-row>
      <b-row align-v="end">
        <span> Setor </span>
      </b-row>
      <b-row align-v="end">
        <h5> {{ getSector(ticker) }} </h5>
      </b-row>
      <b-row align-v="end">
        <span> Indústria </span>
      </b-row>
      <b-row align-v="end">
        <h5> {{ getIndustry(ticker) }} </h5>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'
import Socials from '@/components/utils/Socials'
import PerformanceCircle from '@/components/utils/PerformanceCircle'

export default {
  name: 'AssetInfo',

  components: {
    Socials,
    PerformanceCircle
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
      { caption: '7d', state: false },
      { caption: '30d', state: true },
      { caption: '90d', state: false },
      { caption: 'YTD', state: false }
    ]
  }),

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    thumb () {
      try {
        return client.utils.thumbUrl(this.ticker)
      } catch {
        return ''
      }
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
      } catch {
        await this.$router.push('/feed')
      }
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
        case '7d':
          this.selectedPeriod = 7
          break
        case '30d':
          this.selectedPeriod = 30
          break
        case '90d':
          this.selectedPeriod = 90
          break
        default:
          this.selectedPeriod = this.getYTD()
          break
      }
      await this.fetchAsset()
      this.periods.forEach((b, index) => {
        b.state = i === index
      })
    },
    activeClass (state) {
      if (state === true) {
        return 'text-primary'
      }
      return 'text-secondary'
    },

    getSector (ticker) {
      return client.utils.getSector(ticker)
    },

    getIndustry (ticker) {
      return client.utils.getIndustry(ticker)
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
  }
}
</script>
