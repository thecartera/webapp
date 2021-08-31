<template>
  <div>
      <!-- Event -->
      <b-row class="pt-1">
        <b-col>
          <span> {{ item.owner.name }} </span>
          {{ text }}
          <b-link :to="`/c/${item.data.walletId}`" class="text-success text-decoration-none">
            <span> Cartera </span>
          </b-link>
        </b-col>
      </b-row>

      <!-- STARTS A POSITION-->
      <b-row class="pt-3" v-if="starts.length > 0">
        <b-col cols="auto" style="width:6.3rem"  align-self="start" class="text-secondary">
          <b-row class="m-0 p-0">
            Iniciou
          </b-row>
          <b-row class="m-0 p-0">
            posição
          </b-row>
        </b-col>
        <b-col
          cols="auto"
          class="mr-2"
          v-for="event of starts.slice(0, 4)"
          :key="event.ticker"
        >
          <b-row>
            <b-avatar
              icon="wallet"
              variant="white"
              rounded
              size="md"
              class="mr-1 "
              :to="`/assets/${event.ticker}`"
              :src="thumb(event.ticker)"
            />
          </b-row>
          <b-row>
          <span style="font-size: 0.7rem">
            {{event.ticker}}
          </span>
          </b-row>
        </b-col>
        <b-col cols="auto" class="px-0 mx-0">
          <b-avatar
            size="md"
            rounded v-if="starts.length >= 4"
            icon="three-dots"
            variant="primary"
          />
        </b-col>
      </b-row>

      <!-- ENDS A POSITION -->
      <b-row class="pt-3 mb-2" v-if="ends.length > 0">
        <b-col cols="auto" style="width:6.3rem" align-self="start" class="text-secondary">
          <b-row class="m-0 p-0">
            Encerrou
          </b-row>
          <b-row class="m-0 p-0">
            posição
          </b-row>
        </b-col>
        <b-col cols="auto" class="mr-2" v-for="event of ends.slice(0, 4)" :key="event.ticker">
          <b-row>
            <b-avatar
              icon="wallet"
              variant="white"
              rounded
              size="md"
              class="mr-1 "
              :to="`/assets/${event.ticker}`"
              :src="thumb(event.ticker)"
            />
          </b-row>
          <b-row>
          <span style="font-size: 0.7rem">
            {{event.ticker}}
          </span>
          </b-row>
        </b-col>
        <b-col cols="auto" class="px-0 mx-0">
          <b-avatar
            size="md"
            rounded
            v-if="ends.length >= 4"
            icon="three-dots"
            variant="primary"
          />
        </b-col>
      </b-row>

      <!-- INCREASES A POSITION-->
      <b-row class="pt-3" v-if="increases.length > 0">
        <b-col cols="auto" style="width:6.3rem"  align-self="start" class="text-secondary">
          <b-row class="m-0 p-0">
            Aumentou
          </b-row>
          <b-row class="m-0 p-0">
            Posição
          </b-row>
        </b-col>
        <b-col
          cols="auto"
          class="mr-2"
          v-for="event of increases.slice(0, 4)"
          :key="event.ticker">
          <b-row>
            <b-avatar
              icon="wallet"
              variant="white"
              rounded
              size="md"
              class="mr-1 "
              :to="`/assets/${event.ticker}`"
              :src="thumb(event.ticker)"
            />
          </b-row>
          <b-row>
          <span style="font-size: 0.7rem">
            {{event.ticker}}
          </span>
          </b-row>
        </b-col>
        <b-col cols="auto" class="px-0 mx-0">
          <b-avatar
            size="md"
            rounded v-if="increases.length >= 4"
            icon="three-dots"
            variant="primary"
          />
        </b-col>
      </b-row>

      <!-- DECREASES A POSITION -->
      <b-row class="pt-3 mb-2" v-if="decreases.length > 0">
        <b-col cols="auto" style="width:6.3rem" align-self="start" class="text-secondary">
          <b-row class="m-0 p-0">
            Diminuiu
          </b-row>
          <b-row class="m-0 p-0">
            Posição
          </b-row>
        </b-col>
        <b-col cols="auto" class="mr-2" v-for="event of decreases.slice(0, 4)" :key="event.ticker">
          <b-row>
            <b-avatar
              icon="wallet"
              variant="white"
              rounded
              size="md"
              class="mr-1 "
              :to="`/assets/${event.ticker}`"
              :src="thumb(event.ticker)"
            />
          </b-row>
          <b-row>
          <span style="font-size: 0.7rem">
            {{event.ticker}}
          </span>
          </b-row>
        </b-col>
        <b-col cols="auto" class="px-0 mx-0">
          <b-avatar
            size="md"
            rounded
            v-if="decreases.length >= 4"
            icon="three-dots"
            variant="primary"
          />
        </b-col>
      </b-row>

    </div>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'WalletEventItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    text () {
      switch (this.item.type) {
        case 'NEW_WALLET':
          return 'criou uma'
        case 'WALLET_ASSETS_EDIT':
          return 'atualizou sua'
        default:
          return ''
      }
    },
    increases () {
      return this.item.data.changes.filter(evt => evt.change === 'INC')
    },
    decreases () {
      return this.item.data.changes.filter(evt => evt.change === 'DEC')
    },
    starts () {
      return this.item.data.changes.filter(evt => evt.change === 'START')
    },
    ends () {
      return this.item.data.changes.filter(evt => evt.change === 'END')
    }
  },

  methods: {
    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    }
  }

}
</script>
