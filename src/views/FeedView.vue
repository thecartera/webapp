<template>
<div>
  <Navbar />

  <ThreeColumnsLayout>
    <Loading v-if="loading" />
    <template v-if="feed.length === 0 && !loading">
      <NewUser @updateFeed="updateFeed" class="mt-3" />
      <SuggestedFriendsMobile class="mt-3" />
    </template>

    <template v-for="item of feed.slice(0, 3)">
      <EventItem :key="item.id" :item="item" class="mt-3" />
    </template>
    <SuggestedFriendsMobile v-if="feed.length !== 0" class="mt-3" />
    <template v-for="item of feed.slice(3)">
      <EventItem :key="item.id" :item="item" class="mt-3" />
    </template>
    <p class="invisible" v-b-visible="loadFeedItems"></p>
    <template v-slot:right>
      <InviteFriends />
    </template>
  </ThreeColumnsLayout>
</div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/navbars/Navbar'
import EventItem from '@/components/posts/EventItem'
import InviteFriends from '@/components/utils/InviteFriends'
import NewUser from '@/components/posts/NewUser'
import SuggestedFriendsMobile from '@/components/posts/SuggestedFriendsMobile'
import Loading from '@/components/utils/Loading'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'FeedView',

  components: {
    Navbar,
    EventItem,
    InviteFriends,
    NewUser,
    Loading,
    SuggestedFriendsMobile,
    ThreeColumnsLayout
  },

  data: () => ({
    feed: [],
    loading: true
  }),

  methods: {
    async loadFeedItems () {
      if (this.feed.length === 0) {
        return
      }

      const lastId = this.feed[this.feed.length - 1].id
      const newItems = await client.feed.getFeed(10, lastId)
      this.feed = [...this.feed, ...newItems]
    },
    async updateFeed () {
      const newItems = await client.feed.getFeed(10)
      this.feed = [...this.feed, ...newItems]
    }
  },

  async mounted () {
    this.feed = await client.feed.getFeed(10)
    this.loading = false
  }
}
</script>

<style scoped>
.vh-80 {
  height: 80vh;
}
</style>
