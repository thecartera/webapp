<template>
  <b-card no-body class="mt-1" style="background-color: #F3F2EF; border-color: #F3F2EF">
    <b-card-body>
      <b-row align-h="center">
        <!-- LOGGED USER PICTURE -->
        <b-col cols="auto" class="p-0">
          <b-avatar size="3.5rem" :src="logged_user.picture"/>
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

      <hr>

      <b-row align-h="center">
        <span class="text-secondary"> Sugestões de amizade </span>
      </b-row>

      <b-row v-for="suggestedUser of suggestedUsers.slice(0,5)" :key="suggestedUser.username">
        <b-col class="p-0">
          <SimpleUserCard :user="suggestedUser" :bgcolor="'cartera-blue'" :bordercolor="'cartera-blue'"/>
        </b-col>
      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'
import SimpleUserCard from '@/components/SimpleUserCard'

export default {
  name: 'InviteFriends',

  components: {
    SimpleUserCard
  },

  data: () => ({
    suggestedUsers: []
  }),

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    }
  },

  async mounted () {
    this.suggestedUsers = await client.users.following('mauriciomb97')
  }
}
</script>
