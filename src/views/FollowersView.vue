<template>
  <div>
    <FollowsNavbar/>

    <b-container class="container px-0" style="overflow-x: hidden">
      <b-row>
        <b-col cols="0" md="2" lg="3"/>
        <b-col cols="12" md="8" lg="6">
          <b-row v-for="f of followers" :key="f.username">
            <b-col>
              <SimpleUserCard
                :user="f"
                @follow="follow"
                @unfollow="unfollow"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="0" md="2" lg="3"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import client from '@/commons/client.api'

import FollowsNavbar from '@/components/FollowsNavbar'
import SimpleUserCard from '@/components/SimpleUserCard'

export default {
  name: 'FollowersView',

  components: {
    FollowsNavbar,
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
