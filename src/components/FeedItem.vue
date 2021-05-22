<template>
  <b-card no-body class="p-2">
    <!-- User -->
    <b-row class="m-0" >
      <!-- Picture -->
      <b-col cols="auto" class="p-0">
        <b-avatar rounded size="3rem" :src="item.owner.picture" :to="`/users/${item.owner.username}`"/>
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
    <b-row class="pt-2">
      <b-col class="text-truncate">
        <b-link :to="`/users/${item.owner.username}`"> {{ item.owner.name }} </b-link>
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
      return new Date(this.item.timestamp).toLocaleString('pt-BR').substring(0, 16)
    }
  }
}
</script>
