<template>
<div>
  <Navbar />

  <ThreeColumnsLayout>
    <Loading v-if="loading" />
    <template v-if="!loading">
      <WritePost class="mt-3" @new-post="newPost" />
    </template>

    <template v-if="feed.length <= 1 && !loading && showWelcome">
      <NewUser @updateFeed="updateFeed" class="mt-3" />
      <SuggestedFriendsMobile class="mt-3" />
    </template>

    <template v-for="item of feed.slice(0, 3)">
      <EventItem :key="item.id" :item="item" class="mt-3" @delete-event="deleteEvent" />
    </template>
    <SuggestedFriendsMobile v-if="feed.length !== 0" class="mt-3" />
    <template v-for="item of feed.slice(3)">
      <EventItem :key="item.id" :item="item" class="mt-3" @delete-event="deleteEvent" />
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
import WritePost from '@/components/posts/WritePost'
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
    WritePost,
    ThreeColumnsLayout
  },

  data: () => ({
    feed: [],
    loading: true,
    showWelcome: true
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
    async newPost (newPost) {
      this.feed.unshift(newPost)
    },
    async updateFeed () {
      this.showWelcome = false
      const newItems = await client.feed.getFeed(10)
      this.feed = [...this.feed, ...newItems]
    },
    deleteEvent (eventId) {
      for (let ci = 0; ci < this.feed.length; ci++) {
        if (this.feed[ci].id === eventId) {
          this.feed.splice(ci, 1)
        }
      }
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
