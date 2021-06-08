<template>
<div>
  <FollowsNavbar />

  <ThreeColumnsLayout>
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
  </ThreeColumnsLayout>
</div>
</template>

<script>
import client from '@/commons/client.api'

import Loading from '@/components/Loading'
import FollowsNavbar from '@/components/FollowsNavbar'
import SimpleUserCard from '@/components/SimpleUserCard'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'FollowingView',

  components: {
    FollowsNavbar,
    SimpleUserCard,
    ThreeColumnsLayout,
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
    this.loading = true
    this.following = await client.users.following(this.id)
    this.loading = false
  }
}
</script>
