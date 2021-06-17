<template>
<div>
  <Navbar />

  <ThreeColumnsLayout>
    <Loading v-if="loading" />
    <template>
      <EventItem v-if="item" :item="item" class="mt-3" @delete-event="deleteEvent" />
    </template>
    <b-button block class="mt-3"> Ir ao feed </b-button>
  </ThreeColumnsLayout>
</div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/navbars/Navbar'
import EventItem from '@/components/posts/EventItem'
import Loading from '@/components/utils/Loading'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'SingleEventView',

  components: {
    Navbar,
    EventItem,
    Loading,
    ThreeColumnsLayout
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    item: null,
    loading: true
  }),

  methods: {
    deleteEvent (eventId) {
      for (let ci = 0; ci < this.feed.length; ci++) {
        if (this.feed[ci].id === eventId) {
          this.feed.splice(ci, 1)
        }
      }
    }
  },

  async created () {
    this.item = await client.events.getEvent(this.id)
    this.loading = false
  }
}
</script>
