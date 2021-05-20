<template>
  <div>
    <Navbar />

    <b-container class="container px-0" style="min-height: 60rem">
      <b-row v-for="f of following" :key="f.username">
        <b-col cols="0" md="2" lg="3"/>
        <b-col cols="12" md="8" lg="6">
          <SimpleUserCard
            :user="f"
            @follow="follow"
            @unfollow="unfollow"
          />
        </b-col>
        <b-col cols="0" md="2" lg="3"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/Navbar'
import SimpleUserCard from '@/components/SimpleUserCard'

export default {
  name: 'FollowingView',

  components: {
    Navbar,
    SimpleUserCard
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    following: []
  }),

  methods: {
    async follow (user) {
      await client.users.follow(user.username)
      user.following = true
    },
    async unfollow (user) {
      await client.users.unfollow(user.username)
      user.following = false
    }
  },

  async mounted () {
    this.following = await client.users.following(this.id)
  }
}
</script>
