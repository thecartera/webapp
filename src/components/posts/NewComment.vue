<template>
  <b-card no-body class="px-3" border-variant="white">
    <b-row align-h="center">
      <b-col class="px-0" cols="auto">
        <b-avatar :src="loggedUser.picture" size="2rem"/>
      </b-col>
      <b-col class="pl-2 pr-0">
        <b-form-input v-model="newCommentText" size="sm" placeholder="Adicione um comentário..."/>
      </b-col>
    </b-row>
    <b-row align-h="end" class="pt-2">
      <b-col cols="auto" v-if="commentLength > 250">
        <span :class="maxCommentLengthExceeded ? 'text-danger font-weight-bold' : ''">
          {{ `${commentLength}/${maxCommentLength}` }}
        </span>
      </b-col>
      <b-col cols="auto" class="p-0">
        <b-button
            v-if="commentLength > 0"
            size="sm"
            variant="primary"
            :disabled="maxCommentLengthExceeded"
            @click="postComment(newCommentText)"
        >
          Publicar
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

export default {
  data: () => ({
    newCommentText: '',
    maxCommentLength: 300
  }),

  computed: {
    loggedUser () {
      return this.$store.state.auth.user
    },
    commentLength () {
      return this.newCommentText.length
    },
    showTextLimitHint () {
      const lengthToShowLimitHint = this.commentLength - 50
      return this.commentLength > lengthToShowLimitHint
    },
    maxCommentLengthExceeded () {
      return this.commentLength > this.maxCommentLength
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
