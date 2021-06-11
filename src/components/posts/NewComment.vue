<template>
  <b-card no-body class="px-3" border-variant="white">
    <b-row align-h="center">
      <b-col class="px-0" cols="auto">
        <b-avatar :src="loggedUser.picture" size="2rem"/>
      </b-col>
      <b-col class="pl-2 pr-0">
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
    postComment (text) {
      this.newCommentText = ''
      this.$emit('post-comment', text)
    }
  }
}
</script>
