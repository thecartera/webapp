<template>
  <b-card no-body class="px-2 pt-2">
    <!-- User -->
    <b-row class="m-0" >
      <!-- Picture -->
      <b-col cols="auto" class="p-0">
        <b-avatar size="3rem" :src="item.owner.picture" :to="`/users/${item.owner.username}`"/>
      </b-col>

      <b-col style="line-height: 1.1rem" class="pl-4">
        <!-- Username -->
        <b-row>
          <strong class="text-truncate"> {{ item.owner.username }} </strong>
        </b-row>
        <!-- Title -->
        <b-row>
          <span v-if="item.owner.title" class="text-secondary" style="font-size: 0.85rem">
            {{ item.owner.title }}
          </span>
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

    <!-- Buys -->
    <b-row class="pt-3" v-if="buys.length > 0">
      <b-col cols="auto" style="width:6.3rem"  align-self="start" class="text-success">
        Compras:
      </b-col>
      <b-col cols="auto" class="mr-2" v-for="event of buys.slice(0, 4)" :key="event.ticker">
        <b-row>
          <b-avatar
            icon="wallet"
            variant="success"
            rounded
            size="md"
            class="mr-1"
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
          rounded v-if="buys.length >= 4"
          icon="three-dots"
          variant="primary"
        />
      </b-col>
    </b-row>

    <!-- Sells -->
    <b-row class="pt-3 mb-2" v-if="sells.length > 0">
      <b-col cols="auto" style="width:6.3rem" align-self="start" class="text-danger">
        Vendas:
      </b-col>
      <b-col cols="auto" class="mr-2" v-for="event of sells.slice(0, 4)" :key="event.ticker">
        <b-row>
          <b-avatar
            icon="wallet"
            variant="success"
            rounded
            size="md"
            class="mr-1"
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
          v-if="sells.length >= 4"
          icon="three-dots"
          variant="primary"
        />
      </b-col>
    </b-row>

    <!-- Reaction button -->
    <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
      <b-row align-v="center">
        <!-- Like -->
        <b-button v-if="!this.like" @click="likePost" variant="white" size="md">
          <font-awesome-icon :icon="['far', 'thumbs-up']" />
          <span> {{ likeCount }} </span>
        </b-button>

        <!-- Unlike -->
        <b-button v-else @click="unlikePost" variant="white" size="md">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-primary" />
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
