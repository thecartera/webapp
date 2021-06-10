<template>
  <b-container class="p-0">
    <b-card no-body class="px-2 pt-2">
      <!-- User -->
      <b-row class="m-0" >
        <!-- Picture -->
        <b-col cols="auto" class="p-0">
          <b-avatar size="3rem" :src="item.owner.picture" :to="userEndpointAddr"/>
        </b-col>

        <b-col style="line-height: 1.1rem" class="pl-4">
          <!-- Username -->
          <b-row>
            <b-link :to="userEndpointAddr" class="text-dark text-decoration-none">
              <strong class="text-truncate"> {{ item.owner.username }} </strong>
            </b-link>
          </b-row>
          <!-- Title -->
          <b-row>
          <span v-if="item.owner.title" class="text-secondary" style="font-size: 0.85rem">
            {{ item.owner.title }}
          </span>
          </b-row>
          <!-- Timestamp -->
          <b-row class="text-secondary text-truncate" style="font-size: 0.75rem">
            {{ timestamp }}
          </b-row>
        </b-col>
      </b-row>

      <NewAccountEventItem v-if="item.type === 'USER_CREATED'" :item="item"/>
      <WalletEventItem v-else :item="item"/>

      <!-- Reaction button -->
      <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
        <b-row align-v="center">
          <!-- Like -->
          <b-button v-if="!this.like" @click="likePost" variant="white" size="md">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
            <span> {{ likeCount }} </span>
          </b-button>

          <!-- Unlike -->
          <b-button v-else @click="unlikePost" variant="white" size="md">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-primary" />
            <span> {{ likeCount }} </span>
          </b-button>
        </b-row>
      </b-card-footer>
      <NewComment @post-comment="postComment"/>
      <CommentsSection :comments="comments"/>
    </b-card>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'
import WalletEventItem from '@/components/WalletEventItem'
import CommentsSection from '@/components/CommentsSection'
import NewComment from '@/components/NewComment'
import NewAccountEventItem from '@/components/NewAccountEventItem'

export default {
  name: 'EventItem',

  components: {
    WalletEventItem,
    NewAccountEventItem,
    CommentsSection,
    NewComment
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    like: false,
    likeCount: 0,
    comments: [],
    userEndpointAddr: ''
  }),

  computed: {
    timestamp () {
      return new Date(this.item.timestamp).toLocaleString('pt-BR').substring(0, 16)
    }
  },

  methods: {
    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    },
    async likePost () {
      await client.post.likePost(this.item.id)
      this.like = true
      this.likeCount += 1
    },
    async unlikePost () {
      await client.post.unlikePost(this.item.id)
      this.like = false
      this.likeCount -= 1
    },
    async postComment (comment) {
      console.log('here' + this.item.id + comment.text)
      try {
        await client.events.newComment(this.item.id, comment.text)
        this.comments.push(comment)
      } catch (e) {
        console.error(e)
      }
    }
  },

  async created () {
    this.like = this.item.like
    this.likeCount = this.item.likeCount
    this.comments = await client.events.getComments(this.item.id)
    this.userEndpointAddr = `/users/${this.item.owner.username}`
  }
}
</script>
