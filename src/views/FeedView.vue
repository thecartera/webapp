<template>
  <div>
    <Navbar />

    <!-- Feed -->
    <b-container fluid>
      <b-row>
        <b-col cols="0" md="0" lg="2" xl="3" />

        <b-col cols="12" md="7" lg="6" xl="6" class="p-0">
          <b-row v-for="i of feed" :key="i.id" class="mt-1">
            <b-col>
              <FeedItem :item="i" />
            </b-col>
          </b-row>
          <b-badge style="color:#F3F2EF; background-color:#F3F2EF" v-if="this.feed.length" v-b-visible="loadFeedItems">.</b-badge>
        </b-col>

        <b-col class="p-0 d-none d-md-block" cols="0" md="5" lg="4" xl="3">
          <InviteFriends/>
        </b-col>
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
      const lastId = this.feed[this.feed.length - 1].id
      const newItems = await client.feed.getFeed(20, lastId)
      this.feed.push.apply(this.feed, newItems)
    }
  },

  async mounted () {
    this.feed = await client.feed.getFeed(10)
  }
}
</script>
