<template>
<b-container>
  <b-card v-for="(item, i) in parsedEvents" :key="i" class="my-2">
    <!-- Title -->
    <b-card-title>
      <small>
        <strong> {{ item.timestamp }} </strong>
      </small>
    </b-card-title>

    <!-- Changes -->
    <b-card-body style="line-height: 3rem;" class="py-0">
      <b-row v-for="([verb, txt, action, code], d) in item.description" :key="d">
        <AssetIcon :code="code" class="mr-2" />
        <span :class="positive(action)"> {{ verb }} </span>
        <span class="ml-1"> {{ txt }} </span>
      </b-row>
    </b-card-body>
  </b-card>

  <b-spinner class="text-center" v-if="loading"/>

  <b-badge style="color:white; background-color:white" v-b-visible="loadEvents">.</b-badge>
</b-container>
</template>

<script>
import client from '@/commons/client.api'

import AssetIcon from '@/components/utils/AssetIcon'

export default {
  name: 'PortfolioTimeline',

  components: {
    AssetIcon
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      events: [],
      show: 5,
      loading: false
    }
  },

  computed: {
    visibleEvents () {
      return this.events.slice(0, this.show)
    },
    parsedEvents () {
      return this.events.map(i => this.parseEvent(i))
    }
  },

  methods: {
    loadEvents () {
      if (!this.loading && this.show < this.events.length) {
        this.loading = true
        this.show += 5
        this.loading = false
      }
    },
    parseEvent (event) {
      const descrs = []
      if (event.data.type === 'CREATION') {
        descrs.push(['', 'Criou esta carteira', 'CREATION', 'bueno_no_icon_for_walletcreation'])
      }

      for (const { ticker, change } of event.data.changes) {
        const str = ` sua posição em ${ticker}`
        let prestr = '- '
        switch (change) {
          case 'START':
            prestr = 'Iniciou'
            break
          case 'INC':
            prestr = 'Aumentou'
            break
          case 'DEC':
            prestr = 'Diminuiu'
            break
          case 'END':
            prestr = 'Encerrou'
            break
          default:
            prestr = '---'
        }

        descrs.push([prestr, str, change, ticker])
      }

      const date = new Date(event.timestamp)
      return {
        timestamp: date.toLocaleString('pt-BR').slice(0, -3),
        description: descrs
      }
    },
    positive (value) {
      switch (value) {
        case 'START':
          return 'start'
        case 'INC':
          return 'inc'
        case 'DEC':
          return 'dec'
        case 'END':
          return 'end'
        default:
          return 'black'
      }
    }
  },

  async created () {
    this.events = await client.wallets.getHistory(this.id)
  }
}
</script>

<style scoped>
.title {
  font-size: medium;
  color: black;
  font-weight: 900;
}
.start {
  color: green;
  font-weight: 700;
}
.inc {
  color: blue;
  font-weight: 700;
}
.dec {
  color: orange;
  font-weight: 700;
}
.end {
  color: red;
  font-weight: 700;
}
.black {
  color: black;
  font-weight: 700;
}

/* Small devices (mobile) won't have padding for the cards, to gain the extra space */
@media only screen and (max-width: 767px) {
  .cards-l-r-margins {
    padding: 0rem 0rem 0rem 0rem;
  }
}
</style>
