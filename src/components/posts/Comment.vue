<template>
<b-row>
  <b-avatar
    size="2rem"
    class="mr-2"
    :src="user.picture"
    :to="`/users/${user.username}`"
  />
  <b-col class="bg-cartera-blue border rounded">
    <b-row align-content="between" style="line-height: 1rem;" class="pl-2 pt-1">
      <!-- User and comment info -->
      <b-col class="pl-0 text-left">
        <span class="font-weight-bold">
          <b-link :to="`/users/${user.username}`" class="text-dark">
            {{ user.username }}
          </b-link>
          <small class="text-secondary pl-2">
            {{ humanTime(comment.createdAt) }}
          </small>
        </span>
        <br>
        <small class="text-secondary"> {{ user.title }} </small>
      </b-col>

      <!-- Delete comment dropdown -->
      <b-col v-if="isOwner" cols="auto" class="text-right pr-0">
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
          <b-dropdown-item-button @click="emitDelete()">
            <b-icon icon="trash" variant="secondary"/>
            <span> Excluir comentário </span>
          </b-dropdown-item-button>
        </b-dropdown>
      </b-col>
    </b-row>

    <!-- Comment text -->
    <b-row class="px-2 py-1">
      <span
        style="line-height: 1.2rem;"
        class="text-break"
        v-html="linkify(comment.text)"
      />
    </b-row>
  </b-col>
</b-row>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'Comment',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  computed: {
    user () {
      return this.comment.user
    },

    isOwner () {
      return this.$store.state.auth.user.username === this.user.username
    }
  },

  methods: {
    humanTime (timestamp) {
      return client.utils.humanTime(timestamp)
    },

    linkify (text) {
      return client.utils.linkify(text)
    },

    emitDelete () {
      this.$emit('delete', this.comment)
    }
  }
}
</script>
