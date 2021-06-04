<template>
  <div>
    <FollowsNavbar/>

    <b-container class="container px-0" style="overflow-x: hidden">
      <b-row>
        <b-col cols="0" md="2" lg="3"/>
        <b-col cols="12" md="8" lg="6">
          <Loading v-if="loading"/>
          <b-row v-for="f of followers" :key="f.username">
            <b-col>
              <SimpleUserCard
                :user="f"
                @follow="follow"
                @unfollow="unfollow"
              />
            </b-col>
          </b-row>
          <b-row class="pt-2" v-if="followers.length === 0 && !loading">
            <b-col>
              <b-card> Esse usuário não tem seguidores </b-card>
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
import Loading from '@/components/Loading'

export default {
  name: 'FollowersView',

  components: {
    FollowsNavbar,
    SimpleUserCard,
    Loading
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    followers: [],
    loading: true
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
    const followers = await client.users.followers(this.id)
    const cleanFollowers = []
    for (const f of followers) {
      if (f) {
        cleanFollowers.push(f)
      }
    }
    this.followers = cleanFollowers
    this.loading = false
  }
}
</script>

<style scoped>
.vh-80 {
  height: 80vh;
}
</style>
