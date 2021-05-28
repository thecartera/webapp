<template>
  <div>
    <Navbar />

    <!-- Profile -->
    <b-container fluid style="overflow-x: hidden" class="p-0 m-0">
      <b-row>
        <!-- Left -->
        <b-col cols="0" md="0" lg="2" xl="3"/>

        <!-- Center -->
        <b-col cols="12" md="7" lg="6" xl="6">
          <b-row>
            <Profile :id="id" class="mt-2"/>
          </b-row>
          <b-row v-for="item of events" :key="item.id" class="mt-2">
            <b-col>
              <FeedItem :item="item" />
            </b-col>
          </b-row>
        </b-col>

        <!-- Right -->
        <b-col class="d-none d-md-block" cols="0" md="5" lg="4" xl="3"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import FeedItem from '@/components/FeedItem'

import client from '@/commons/client.api'

export default {
  name: 'ProfileView',

  components: {
    Navbar,
    FeedItem,
    Profile
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    events: []
  }),

  watch: {
    async id (newVal) { // watch if opening another user profile
      await this.loadEvents(newVal)
    }
  },

  methods: {
    async loadEvents () {
      const events = await client.users.events(this.id)
      const eventOwner = await client.users.fetchByUsername(this.id)
      const eventsWithOwner = []
      for (const event of events) {
        event.owner = eventOwner
        eventsWithOwner.push(event)
      }
      this.events = eventsWithOwner
    }
  },

  async mounted () {
    this.loadEvents()
  }
}
</script>
