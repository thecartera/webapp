<template>
  <b-card no-body class="mt-0" bg-variant="cartera-blue" border-variant="cartera-blue">
    <b-card-body>
      <b-row align-h="center">
        <!-- LOGGED USER PICTURE -->
        <b-col cols="auto" class="p-0">
          <b-avatar
            size="lg"
            :src="logged_user.picture"
            variant="white"
            :to="`/users/${logged_user.username}`"
          />
        </b-col>
      </b-row>

      <b-row align-h="center">
        <b-link class="text-decoration-none">
          <b class="text-dark"> {{ logged_user.username }} </b>
        </b-link>
      </b-row>

      <b-row align-h="center">
        <span class="text-secondary"> {{ logged_user.name }} </span>
      </b-row>

      <b-row align-h="center">
        <span class="text-secondary"> {{ logged_user.title }} </span>
      </b-row>

      <hr class="m-2">

      <b-row align-h="start" align-v="center" style="font-size: 0.8rem" class="pl-1">
        <b-col cols="auto">
          <span class="text-secondary"> Sugestões de amizade </span>
        </b-col>
        <b-col>
          <b-row align-h="end">
            <b-button variant="cartera-blue" :disabled="page === 0" size="sm" @click="pageDec">
              <b-icon icon="caret-left-fill"/>
            </b-button>
            <b-button variant="cartera-blue" :disabled="lastPage" size="sm" @click="pageInc">
              <b-icon icon="caret-right-fill"/>
            </b-button>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-for="suggestedUser of suggestedUsers.slice(firstIndexUser, lastIndexUser)" :key="suggestedUser.username">
        <b-col class="px-0">
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
import SimpleInviteUserCard from '@/components/utils/SimpleInviteUserCard'

export default {
  name: 'InviteFriends',

  components: {
    SimpleInviteUserCard
  },

  data: () => ({
    suggestedUsers: [],
    page: 0,
    size: 5
  }),

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    },
    firstIndexUser () {
      return this.size * this.page
    },
    lastIndexUser () {
      return this.size + (this.size * this.page)
    },
    lastPage () {
      return this.lastIndexUser >= this.suggestedUsers.length
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
    },
    pageDec () {
      if (this.page !== 0) {
        this.page = this.page - 1
      }
    },
    pageInc () {
      if (!this.lastPage) {
        this.page = this.page + 1
      }
    }
  },

  async mounted () {
    const suggestions = await client.users.getSuggestedFriends(30)
    this.suggestedUsers = suggestions.sort(() => 0.5 - Math.random())
  }
}
</script>
