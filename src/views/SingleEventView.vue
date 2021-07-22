<template>
<div>
  <Navbar />

  <ThreeColumnsLayout>
    <Loading v-if="loading" />
    <template>
      <EventItem v-if="item" :item="item" class="mt-3" @delete-event="deleteEvent" />
    </template>
    <b-row align-h="center">
      <b-col cols="4">
        <b-button v-if="auth" block class="mt-3" to="/"> Ir ao feed </b-button>
      </b-col>
    </b-row>
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

  computed: {
    auth () {
      return this.$store.state.auth.auth
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

  watch: {
    async id () { // watch if opening another event
      this.item = await client.events.getEvent(this.id)
    }
  },

  async created () {
    this.item = await client.events.getEvent(this.id)
    this.loading = false
  }
}
</script>
