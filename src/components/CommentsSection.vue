<template>
  <b-card no-body class="pl-3" border-variant="white">
    <b-row class="mt-2" align-h="left" v-for="comment of comments.slice(0, visibleQtty)" :key="comment.id">
      <b-col class="px-0 pt-1" cols="auto" align-self="start">
        <b-avatar :src="comment.user.picture" size="2rem" :to="`users/${comment.user.username}`"/>
      </b-col>
      <b-col class="pl-1" style="line-height: 1rem" align-self="start">
        <b-card bg-variant="cartera-blue" no-body class="py-1 mb-1">
          <b-row class="pl-4 pr-3">
            <b-link
              :to="`users/${comment.user.username}`"
              style="font-size: 0.9rem"
              class="font-weight-bold text-dark"
            >
                {{ comment.user.username }}
            </b-link>
          </b-row>
          <b-row class="px-4 small text-secondary text-truncate">
            <span> {{ comment.user.title }} </span>
          </b-row>
          <b-row class="px-4 pt-2 text-break">
            <span> {{ comment.text }} </span>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="auto">
        <b-container v-if="visibleQtty !== 9999 && comments.length > 0" class="my-1" size="sm" @click="visibleQtty = 9999">
          <span class="text-bold text-primary show-clickable"> Ver todos </span>
        </b-container>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

export default {
  props: {
    comments: []
  },

  data: () => ({
    visibleQtty: 3
  }),

  computed: {
    loggedUser () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style scoped>
.show-clickable {
  cursor: pointer
}
</style>
