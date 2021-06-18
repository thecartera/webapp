<template>
  <b-card no-body class="px-3" border-variant="white">
    <b-row class="mt-2" align-h="start" v-for="comment of comments.slice(0, visibleQtty)" :key="comment.id">
      <b-col class="px-0 pt-1" cols="auto" align-self="start">
        <b-avatar :src="comment.user.picture" size="2rem" :to="`/users/${comment.user.username}`"/>
      </b-col>
      <b-col class="my-0 p-0" align-self="start">
        <b-card bg-variant="cartera-blue" class="ml-2 py-1" no-body>
          <b-row class="mx-0">
            <b-col class="pl-4" style="line-height: 1rem">
              <b-row align-h="start">
                <b-link
                  :to="`/users/${comment.user.username}`"
                  style="font-size: 0.9rem"
                  class="font-weight-bold text-dark"
                >
                    {{ comment.user.username }}
                </b-link>
                <span class="small text-secondary pl-2"> {{ humanTime(comment.createdAt) }} </span>
              </b-row>
              <b-row class="px-0 small text-secondary">
                <span class="text-wrap"> {{ comment.user.title }} </span>
              </b-row>
            </b-col>
            <b-col cols="auto" class="mr-3 p-0" v-if="loggedUser.username === comment.user.username">
              <b-row align-h="end">
                <b-dropdown no-caret size="sm" right variant="cartera-blue">
                  <template #button-content>
                    <b-icon
                      icon="three-dots-vertical"
                      scale="0.7"
                      style="cursor: pointer"
                      variant="dark"
                    />
                  </template>

                <!-- Delete Comment -->
                <b-dropdown-item-button
                  v-if="loggedUser.username === comment.user.username"
                  @click="deleteComment(comment.id)"
                >
                  <b-icon
                    icon="trash"
                    variant="secondary"
                  /> <span> Excluir comentário </span>
                </b-dropdown-item-button>
                </b-dropdown>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="px-4 pt-1" style="line-height: 1.2rem">
            <span class="text-break"> {{ comment.text }} </span>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mb-2">
      <b-col cols="auto">
        <b-container
          v-if="visibleQtty < commentCount && comments.length > visibleQtty"
          class="mt-2"
          @click="loadMoreComments">
          <span class="text-bold text-primary show-clickable"> Ver mais </span>
        </b-container>
      </b-col>
      <b-col v-if="visibleQtty != 3" cols="auto">
        <b-container @click="visibleQtty = 3" class="mt-2">
          <span class="text-bold text-primary show-clickable"> Ver menos </span>
        </b-container>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'

export default {
  props: {
    comments: [],
    commentCount: Number
  },

  data: () => ({
    visibleQtty: 3,
    step: 4
  }),

  computed: {
    loggedUser () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    loadMoreComments () {
      this.visibleQtty += this.step
      const beforeId = this.comments[this.comments.length - 1].id
      this.$emit('load-more-comments', beforeId, this.step)
    },
    deleteComment (commentId) {
      this.$emit('delete-comment', commentId)
    },
    humanTime (timestamp) {
      return client.utils.humanTime(timestamp)
    }
  }
}
</script>

<style scoped>
.show-clickable {
  cursor: pointer
}
</style>
