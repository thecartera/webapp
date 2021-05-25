<template>
  <b-card no-body class="px-2 pt-2">
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

    <b-row class="pt-2 mb-2" v-if="buys.length > 0">
      <b-col cols="auto" style="width:6.5rem" align-self="center" class="text-success">
        Compras:
      </b-col>
      <b-avatar
        icon="wallet"
        variant="success"
        rounded
        size="2.2rem"
        class="mr-1"
        v-for="event of buys.slice(0, 4)"
        :key="event.ticker"
        :src="thumb(event.ticker)"
      >
      </b-avatar>
      <b-avatar size="2.2rem" rounded v-if="buys.length >= 4" icon="three-dots" variant="primary"/>
    </b-row>

    <b-row class="pt-2 mb-2" v-if="sells.length > 0">
      <b-col cols="auto" style="width:6.5rem" align-self="center" class="text-danger">
        Vendas:
      </b-col>
      <b-avatar
        rounded
        size="2.2rem"
        class="mr-1"
        v-for="event of sells.slice(0, 4)"
        :key="event.ticker"
        :src="thumb(event.ticker)"
      >
      </b-avatar>
      <b-avatar size="2.2rem" rounded v-if="sells.length >= 4" icon="three-dots" variant="primary"/>
    </b-row>

    <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
      <b-row align-v="center">
        <b-button v-if="!this.like" @click="likePost" variant="white" size="sm">
          <font-awesome-icon :icon="['far', 'thumbs-up']" style="color:#302f33; height: 1.3rem; width: 1.3rem"/>
          <span> {{ likeCount }} </span>
        </b-button>
        <b-button v-else @click="unlikePost" variant="white" size="sm">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" style="color:#4e79a7; height: 1.3rem; width: 1.3rem"/>
          <span> {{ likeCount }} </span>
        </b-button>
      </b-row>
    </b-card-footer>
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

  data: () => ({
    like: false,
    likeCount: 0
  }),

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
    async likePost () {
      await client.post.likePost(this.item.id)
      this.like = true
      this.likeCount += 1
    },
    async unlikePost () {
      await client.post.unlikePost(this.item.id)
      this.like = false
      this.likeCount -= 1
    }
  },

  created () {
    this.like = this.item.like
    this.likeCount = this.item.likeCount
  }
}
</script>
