<template>
<div>
  <FollowsNavbar />

  <BaseView>
    <Loading v-if="loading"/>
    <SimpleUserCard
      v-for="f of followers"
      :key="f.username"
      :user="f"
      @follow="follow"
      @unfollow="unfollow"
    />
    <b-card v-if="followers.length === 0 && !loading">
      Esse usuário não tem seguidores
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
  name: 'FollowersView',

  components: {
    FollowsNavbar,
    SimpleUserCard,
    Loading,
    BaseView
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
    this.loading = true
    this.followers = await client.users.followers(this.id)
    this.loading = false
  }
}
</script>
