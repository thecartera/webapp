<template>
  <div>
    <Navbar />

    <!-- Feed -->
    <b-container>
      <b-row v-for="i of feed" :key="i.id" >
        <b-col>
          <FeedItem :item="i" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/Navbar'
import FeedItem from '@/components/FeedItem'

export default {
  name: 'FeedView',

  components: {
    Navbar,
    FeedItem
  },

  data: () => ({
    feed: []
  }),

  async mounted () {
    this.feed = await client.feed.getFeed(10)
  }
}
</script>
