<template>
  <b-container class="cards-l-r-margins">
    <ul class="list-unstyled">
      <li v-for="(item, i) in visibleEvents" :key="i" class="my-2">
        <b-card no-body>
          <b-card-body>
            <b-row>
              <b-col>
                <h6 class="title"> {{ item.timestamp }} </h6>
                <span style="line-height:3rem" v-for="(descr, d) in item.description" :key="d">
                  <b-avatar
                    rounded
                    icon="wallet2"
                    variant="white"
                    class="image-size"
                    :to="`/assets/${descr[3]}`"
                    :src="thumb(descr[3])"
                  />
                  <span :class="positive(descr[2])">
                    {{ descr[0] }}
                  </span>
                  <span> {{ descr[1] }} </span>
                  <br>
                </span>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </li>
      <li v-if="loading" class="text-center mt-5"><b-spinner /></li>
    </ul>
    <b-row align-h="center">
      <b-badge style="color:white; background-color:white" v-b-visible="loadEvents">.</b-badge>
    </b-row>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'PortfolioTimeline',
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
    }
  },
  methods: {
    loadEvents () {
      if (!this.loading && this.show < this.events.length) {
        this.loading = true
        this.show += 5
        this.loading = false

        this.parseEvents(this.raw)
      }
    },
    parseEvents (newEvents) {
      for (let evtIndex = 0; evtIndex < newEvents.length; evtIndex++) {
        this.parseEvent(newEvents[evtIndex])
      }
    },
    parseEvent (newEvent) {
      const descrs = []
      if (newEvent.data.type === 'CREATION') {
        descrs.push(['', 'Criou esta carteira', 'CREATION', 'bueno_no_icon_for_walletcreation'])
      }
      for (let i = 0; i < newEvent.data.changes.length; i++) {
        const subevent = newEvent.data.changes[i]
        const str = ` sua posição em ${subevent.ticker}`
        let prestr = '- '
        switch (subevent.change) {
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
        descrs.push([prestr, str, subevent.change, subevent.ticker])
      }
      const date = new Date(newEvent.timestamp)
      const parsedEvent = {
        timestamp: date.toLocaleString('pt-BR').slice(0, -3),
        description: descrs
      }
      this.events.push(parsedEvent)
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
    },
    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    }
  },
  async created () {
    const rawEvents = await client.wallets.getHistory(this.id)
    this.parseEvents(rawEvents)
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
