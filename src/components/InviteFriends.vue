<template>
  <b-card no-body class="mt-0" bg-variant="cartera-blue" border-variant="cartera-blue">
    <b-card-body>
      <b-row align-h="center">
        <!-- LOGGED USER PICTURE -->
        <b-col cols="auto" class="p-0">
          <b-avatar size="lg" :src="logged_user.picture"/>
        </b-col>
      </b-row>

      <b-row align-h="center">
        <b class="text-dark"> {{ logged_user.username }} </b>
      </b-row>

      <b-row align-h="center">
        <span class="text-secondary"> {{ logged_user.name }} </span>
      </b-row>

      <b-row align-h="center">
        <span class="text-secondary"> {{ logged_user.title }} </span>
      </b-row>

      <hr class="m-2">

      <b-row style="font-size: 0.8rem" class="pl-1">
        <b-col cols="auto">
          <b-row align-h="start">
          <span class="text-secondary"> Sugestões de amizade </span>
          </b-row>
        </b-col>
        <!-- TODO: REDIRECT TO SUGGESTED FRIENDS VIEW -->
        <!-- <b-col>
          <b-row align-h="end">
          <span class="text-primary" style="cursor: pointer"> ver mais </span>
          </b-row>
        </b-col> -->
      </b-row>

      <b-row v-for="suggestedUser of suggestedUsers.slice(0,5)" :key="suggestedUser.username">
        <b-col class="pl-0 pr-2">
          <SimpleInviteUserCard
            :user="suggestedUser"
            :bgcolor="'cartera-blue'"
            :bordercolor="'cartera-blue'"
            @follow="follow"
            @unfollow="unfollow"
          />
        </b-col>
      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'
import SimpleInviteUserCard from '@/components/SimpleInviteUserCard'

export default {
  name: 'InviteFriends',

  components: {
    SimpleInviteUserCard
  },

  data: () => ({
    suggestedUsers: []
  }),

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    }
  },

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
    this.suggestedUsers = await client.users.following('mauriciomb97')
  }
}
</script>
