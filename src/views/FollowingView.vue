<template>
<div>
  <FollowsNavbar />

  <BaseView>
    <Loading v-if="loading"/>
    <SimpleUserCard
      v-for="f of following"
      :key="f.username"
      :user="f"
      @follow="follow"
      @unfollow="unfollow"
    />
    <b-card v-if="following.length === 0 && !loading">
      Esse usuário não segue ninguém
    </b-card>
  </BaseView>
</div>
</template>

<script>
import client from '@/commons/client.api'

import BaseView from '@/views/BaseView'
import Loading from '@/components/Loading'
import FollowsNavbar from '@/components/FollowsNavbar'
import SimpleUserCard from '@/components/SimpleUserCard'

export default {
  name: 'FollowingView',

  components: {
    FollowsNavbar,
    SimpleUserCard,
    BaseView,
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
