<template>
  <div>
    <Navbar />

    <!-- Feed -->
    <b-container fluid>
      <b-row>
        <b-col cols="0" md="0" lg="3" />

        <b-col cols="12" md="8" lg="6" class="p-0">
          <b-row v-for="i of feed" :key="i.id" class="mt-1">
            <b-col>
              <FeedItem :item="i" />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="0" md="4" lg="3" />
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
    this.feed = await client.feed.getFeed(20)
  }
}
</script>
