<template>
  <b-card no-body class="px-3" border-variant="white">
    <b-row align-h="center">
      <b-col class="px-0" cols="auto">
        <b-avatar :src="loggedUser.picture" size="2rem"/>
      </b-col>
      <b-col class="px-1">
        <b-input-group>
          <b-form-input v-model="newCommentText" size="sm" placeholder="Adicione um comentário..."/>
          <b-input-group-append>
            <b-button
              size="sm"
              variant="primary"
              @click="postComment(newCommentText)"
            >
              Publicar
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

export default {
  data: () => ({
    newCommentText: ''
  }),

  computed: {
    loggedUser () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    postComment (comment) {
      this.newCommentText = ''
      const data = {
        text: comment,
        user: {
          name: this.loggedUser.name,
          picture: this.loggedUser.picture,
          username: this.loggedUser.username,
          title: this.loggedUser.name.title
        }
      }
      this.$emit('post-comment', data)
    }
  }
}
</script>
