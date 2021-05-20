<template>
  <div class="cartera-background-color">
    <Navbar />

    <b-container class="container px-0" style="min-height: 60rem">
      <b-row v-for="f of followers" :key="f.username">
        <b-col cols="0" md="0" lg="3"/>
        <b-col cols="12" md="8" lg="6">
          <SimpleUserCard
            :user="f"
            @follow="follow"
            @unfollow="unfollow"
          />
        </b-col>
        <b-col cols="0" md="0" lg="3"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import client from '@/commons/client.api'

import Navbar from '@/components/Navbar'
import SimpleUserCard from '@/components/SimpleUserCard'

export default {
  name: 'FollowersView',

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
    followers: []
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
    this.followers = await client.users.followers(this.id)
  }
}
</script>
