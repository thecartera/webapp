<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <Profile :id="id" class="mt-2"/>
      <template v-for="item of events">
        <EventItem :key="item.id" :item="item" class="mt-2"/>
      </template>
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import Navbar from '@/components/navbars/Navbar'
import Profile from '@/components/profile/Profile'
import EventItem from '@/components/posts/EventItem'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

import client from '@/commons/client.api'

export default {
  name: 'ProfileView',

  components: {
    Navbar,
    EventItem,
    Profile,
    ThreeColumnsLayout
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

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    }
  },

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
