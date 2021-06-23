<template>
<b-container>
  <!-- Comments -->
  <template v-for="comment of sliced">
    <Comment
      class="my-2"
      :key="comment.id"
      :comment="comment"
      @delete="deleteComment"
    />
  </template>

  <!-- See more button -->
  <b-row align-h="center" class="my-2">
    <b-col cols="auto" v-if="canShowLess">
      <b-link @click="showLess"> Ver menos </b-link>
    </b-col>
    <b-col cols="auto" v-if="canShowMore">
      <b-link @click="showMore"> Ver mais </b-link>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import Comment from '@/components/posts/Comment'

export default {
  components: {
    Comment
  },

  props: {
    comments: [],
    commentCount: Number
  },

  data: () => ({
    visibleQtty: 3,
    step: 4
  }),

  computed: {
    sliced () {
      return this.comments.slice(0, this.visibleQtty)
    },

    canShowMore () {
      return this.visibleQtty < this.commentCount &&
        this.comments.length > this.visibleQtty
    },

    canShowLess () {
      return this.visibleQtty !== 3
    }
  },

  methods: {
    showMore () {
      this.visibleQtty += this.step
      const beforeId = this.comments[this.comments.length - 1].id
      this.$emit('load-more-comments', beforeId, this.step)
    },

    showLess () {
      this.visibleQtty = 3
    },

    deleteComment ({ id }) {
      this.$emit('delete-comment', id)
    }
  }
}
</script>
