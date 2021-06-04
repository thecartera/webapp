<template>
  <div>
    <FollowsNavbar />

    <b-container class="container px-0" style="overflow-x: hidden">
      <b-row>
        <b-col cols="0" md="2" lg="3"/>
        <b-col cols="12" md="8" lg="6">
          <Loading v-if="loading"/>
          <b-row v-for="f of following" :key="f.username">
            <b-col>
              <SimpleUserCard
                :user="f"
                @follow="follow"
                @unfollow="unfollow"
              />
            </b-col>
          </b-row>
          <b-row class="pt-2" v-if="following.length === 0 && !loading">
            <b-col>
              <b-card> Esse usuário não segue ningúem </b-card>
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
  name: 'FollowingView',

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
    following: [],
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
    const following = await client.users.following(this.id)
    const cleanFollowing = []
    for (const f of following) {
      if (f) {
        cleanFollowing.push(f)
      }
    }
    this.following = cleanFollowing
    this.loading = false
  }
}
</script>

<style scoped>
.vh-80 {
  height: 80vh;
}
</style>
