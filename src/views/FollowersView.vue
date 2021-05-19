<template>
  <div>
    <Navbar />

    <b-container>
      <b-row v-for="f of followers" :key="f.username">
        <b-col>
          <SimpleUserCard
            :user="f"
            @follow="follow"
            @unfollow="unfollow"
          />
        </b-col>
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
