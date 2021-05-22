<template>
  <b-card>
    <!-- User -->
    <b-row>
      <!-- Picture -->
      <b-col cols="3" md="2" lg="1">
        <b-avatar rounded :src="item.owner.picture" :to="`/users/${item.owner.username}`"/>
      </b-col>

      <!-- Names -->
      <b-col class="text-truncate">
        <strong> {{ item.owner.name }} </strong>
        <span class="ml-1 text-secondary"> @{{ item.owner.username }} </span>
        <br v-if="item.owner.title">
        {{ item.owner.title }}
      </b-col>
    </b-row>

    <!-- Timestamp -->
    <b-row class="mt-1">
      <b-col class="text-secondary text-truncate">
        {{ timestamp }}
      </b-col>
    </b-row>

    <!-- Event -->
    <b-row>
      <b-col class="text-truncate">
        <b-link :to="`/users/${item.owner.username}`"> @{{ item.owner.username }} </b-link>
        {{ text }}
        <b-link :to="`/walllets/${item.data.walletId}`"> cartera </b-link>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
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
      return new Date(this.item.timestamp).toLocaleString('pt-BR')
    }
  }
}
</script>
