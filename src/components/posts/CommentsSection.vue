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
  <b-row class="m-2">
    <b-col cols="4">
      <b-row align-h="center">
        <b-link v-if="canShowLess" @click="showLess"> Ver menos </b-link>
      </b-row>
    </b-col>
    <b-col cols="4">
      <b-row align-h="center">
        <b-link v-if="canShowMore" @click="showMore"> Ver mais </b-link>
      </b-row>
    </b-col>
    <b-col cols="4">
      <b-row align-h="center">
        <span v-if="canShowMoreText" style="font-size:0.9rem; color: gray"> {{showMoreText}} </span>
      </b-row>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import Comment from '@/components/posts/Comment'

export default {
  name: 'CommentsSection',

  components: {
    Comment
  },

  props: {
    comments: [],
    commentCount: Number
  },

  data: () => ({
    initialVisibleQtty: 3,
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
      return this.visibleQtty !== this.initialVisibleQtty
    },

    showMoreText () {
      if (this.visibleQtty > this.comments.length) {
        return `${this.comments.length} de ${this.commentCount}`
      }
      return `${this.visibleQtty} de ${this.commentCount}`
    },

    canShowMoreText () {
      return this.canShowMore || this.canShowLess
    }
  },

  methods: {
    showMore () {
      if (this.visibleQtty + this.step > this.commentCount) {
        this.visibleQtty = this.commentCount
      } else {
        this.visibleQtty += this.step
      }
      const beforeId = this.comments[this.comments.length - 1].id
      this.$emit('load-more-comments', beforeId, this.step)
    },

    showLess () {
      this.visibleQtty = this.initialVisibleQtty
    },

    deleteComment ({ id }) {
      this.$emit('delete-comment', id)
    }
  }
}
</script>
