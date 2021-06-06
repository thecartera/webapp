<template>
<b-container class="p-0">
  <b-card no-body class="px-3">
    <b-row>
      <b-col cols="auto" align-self="center">
        <span class="text-secondary"> Sugeridos para você </span>
      </b-col>
      <b-col>
        <b-row align-h="end">
          <b-button variant="white" :disabled="page === 0" size="lg" @click="pageDec">
            <b-icon variant="primary" icon="caret-left-fill"/>
          </b-button>
          <b-button variant="white" :disabled="lastPage" size="lg" @click="pageInc">
            <b-icon variant="primary" icon="caret-right-fill"/>
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="px-1" cols="4" v-for="suggestedUser of suggestedUsers.slice(firstIndexUser, lastIndexUser)" :key="suggestedUser.username">
          <b-card>
            <b-row align-h="center">
              <b-avatar
                :src="suggestedUser.picture"
                size="lg"
                :to="`/users/${suggestedUser.username}`"
                icon="person-fill">
              </b-avatar>
            </b-row>
            <b-row align-h="center">
              <b-link class="text-dark small text-truncate" :to="`/users/${suggestedUser.username}`">
                <b> {{ suggestedUser.username }} </b>
              </b-link>
            </b-row>
            <b-row align-h="center">
              <span class="small text-truncate text-secondary"> {{ suggestedUser.name }} </span>
            </b-row>
            <b-row align-h="center" class="pt-2">
              <b-button
                v-if="!suggestedUser.following"
                size="sm"
                variant="success"
                @click="follow(suggestedUser)"
              > Seguir
              </b-button>
              <b-button
                v-if="suggestedUser.following"
                size="sm"
                @click="unfollow(suggestedUser)"
              > Seguindo
              </b-button>
            </b-row>
          </b-card>
      </b-col>
    </b-row>
  </b-card>
</b-container>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'InviteFriendMobile',

  data: () => ({
    suggestedUsers: [],
    page: 0,
    pagesize: 3
  }),

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    },
    firstIndexUser () {
      return this.pagesize * this.page
    },
    lastIndexUser () {
      return this.pagesize + (this.pagesize * this.page)
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
