<template>
  <b-card no-body class="p-2">
    <!-- User -->
    <b-row class="m-0" >
      <!-- Picture -->
      <b-col cols="auto" class="p-0">
        <b-avatar size="3rem" :src="item.owner.picture" :to="`/users/${item.owner.username}`"/>
      </b-col>

      <!-- Names -->
      <b-col style="line-height: 1.1rem" class="text-truncate pl-4">
        <b-row>
          <strong> {{ item.owner.username }} </strong>
        </b-row>
        <b-row>
          <span v-if="item.owner.title" class="text-secondary" style="font-size: 0.85rem"> {{ item.owner.title }} </span>
        </b-row>
        <!-- Timestamp -->
        <b-row class="text-secondary text-truncate" style="font-size: 0.75rem">
          {{ timestamp }}
        </b-row>
      </b-col>
    </b-row>

    <!-- Event -->
    <b-row class="pt-1">
      <b-col>
        <b-link :to="`/users/${item.owner.username}`"> {{ item.owner.name }} </b-link>
        {{ text }}
        <b-link :to="`/wallets/${item.data.walletId}`"> cartera </b-link>
      </b-col>
    </b-row>

    <b-row class="pt-2">
      <b-col cols="auto" align-self="center" class="text-success" v-if="buys.length > 0">
        Compras
      </b-col>
      <b-avatar
        rounded
        size="2.2rem"
        class="mr-1"
        v-for="event of buys.slice(0, 5)"
        :key="event.ticker"
        :src="thumb(event.ticker)"
      >
      </b-avatar>
      <b-avatar size="2.2rem" rounded v-if="buys.length >= 5" icon="three-dots" variant="info"/>
    </b-row>

    <b-row class="pt-2">
      <b-col cols="auto" align-self="center" class="text-danger" v-if="sells.length > 0">
        Vendas
      </b-col>
      <b-avatar
        rounded
        size="2.2rem"
        class="mr-1"
        v-for="event of sells.slice(0, 5)"
        :key="event.ticker"
        :src="thumb(event.ticker)"
      >
      </b-avatar>
      <b-avatar size="2.2rem" rounded v-if="sells.length >= 5" icon="three-dots" variant="info"/>
    </b-row>

  </b-card>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'FeedItem',

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
        default:
          return 'atualizou sua'
      }
    },
    timestamp () {
      return new Date(this.item.timestamp).toLocaleString('pt-BR').substring(0, 16)
    },
    buys () {
      return this.item.data.changes.filter(evt => evt.change === 'INC' || evt.change === 'START')
    },
    sells () {
      return this.item.data.changes.filter(evt => evt.change === 'DEC' || evt.change === 'END')
    }
  },

  methods: {
    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    },
    log (a) {
      console.log(a)
      const b = 5
      return b
    }
  }
}
</script>
