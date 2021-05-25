<template>
  <div>
    <Navbar />

    <!-- Feed -->
    <b-container fluid>
      <b-row>
        <!-- Left -->
        <b-col cols="0" md="0" lg="1" xl="3"/>

        <!-- Center Left -->
        <b-col cols="12" md="7" lg="6" xl="5" class="p-1">
          <b-row v-for="item of feed" :key="item.id" class="mt-3">
            <b-col>
              <FeedItem :item="item" />
            </b-col>
          </b-row>

          <!-- TODO: this is very silly -->
          <p class="invisible" v-b-visible="loadFeedItems"></p>
        </b-col>

        <!-- Center Right -->
        <b-col class="d-none d-md-block" cols="0" md="5" lg="4" xl="3">
          <InviteFriends />
        </b-col>

        <!-- Right -->
        <b-col cols="0" md="0" lg="1" xl="1"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/Navbar'
import FeedItem from '@/components/FeedItem'
import InviteFriends from '@/components/InviteFriends'

export default {
  name: 'FeedView',

  components: {
    Navbar,
    FeedItem,
    InviteFriends
  },

  data: () => ({
    feed: []
  }),

  methods: {
    async loadFeedItems () {
      if (this.feed.length === 0) {
        return
      }

      const lastId = this.feed[this.feed.length - 1].id
      const newItems = await client.feed.getFeed(10, lastId)
      this.feed = [...this.feed, ...newItems]
    }
  },

  async mounted () {
    this.feed = await client.feed.getFeed(10)
  }
}
</script>
