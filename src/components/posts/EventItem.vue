<template>
  <b-container class="p-0">
    <b-card no-body class="px-2 pt-2">
      <!-- User -->
      <b-row class="m-0" >
        <!-- Picture -->
        <b-col cols="auto" class="p-0">
          <b-avatar size="3rem" :src="item.owner.picture" :to="userEndpointAddr" variant="white"/>
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
          <b-row class="text-secondary text-truncate small">
            {{ humanTime(item.timestamp) }}
          </b-row>
        </b-col>
        <b-col cols="auto" class="pr-0">
          <b-dropdown no-caret right variant="white" size="sm">
            <template #button-content>
              <b-icon
                icon="three-dots-vertical"
                style="cursor: pointer"
                variant="dark"
              />
            </template>

            <!-- Share Event -->
            <SocialsEvent :url="`https://cartera.com.br/#/events/${item.id}`"/>

            <!-- Delete Event -->
            <b-dropdown-item-button
              v-if="loggedUser.username === item.owner.username"
              @click="deleteEvent()"
            >
              <b-icon
                icon="trash"
                variant="danger"
              /> Excluir postagem
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>
      </b-row>

      <NewAccountEventItem v-if="item.type === 'USER_CREATED'" :item="item"/>
      <PostEventItem v-if="item.type === 'TEXT_POST_CREATED'" :item="item" />
      <WalletEventItem v-if="item.type === 'WALLET_ASSETS_EDIT' || item.type === 'NEW_WALLET'" :item="item"/>

      <!-- Reaction button -->
      <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
        <b-row align-v="center">
          <b-col>
            <b-row align-h="start">
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
          </b-col>
          <b-col>
            <b-row align-h="end" class="mr-1">
              <span style="font-size:0.9rem; color: gray"> {{ commentText }} </span>
            </b-row>
          </b-col>
        </b-row>
      </b-card-footer>
      <NewComment v-if="auth" @post-comment="postComment"/>
      <b-button v-else variant="primary" size="sm" @click="login"> Faça login para comentar </b-button>
      <CommentsSection
        :comments="comments"
        :commentCount="commentCount"
        :alreadyRenderedCommentsIds="alreadyRenderedCommentsIds"
        @load-more-comments="loadMoreComments"
        @delete-comment="deleteComment"
      />
    </b-card>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'
import WalletEventItem from '@/components/posts/WalletEventItem'
import PostEventItem from '@/components/posts/PostEventItem'
import CommentsSection from '@/components/posts/CommentsSection'
import NewComment from '@/components/posts/NewComment'
import NewAccountEventItem from '@/components/posts/NewAccountEventItem'
import SocialsEvent from '@/components/utils/SocialsEvent'
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'EventItem',

  components: {
    WalletEventItem,
    CommentsSection,
    PostEventItem,
    NewAccountEventItem,
    SocialsEvent,
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
    commentCount: 0,
    userEndpointAddr: '',
    alreadyRenderedCommentsIds: new Set()
  }),

  computed: {
    timestampBrazil () {
      return new Date(this.item.timestamp).toLocaleString('pt-BR').substring(0, 16)
    },
    loggedUser () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    },
    commentText () {
      if (this.commentCount === 1) {
        return '1 comentário'
      } else if (this.commentCount > 1) {
        return `${this.commentCount} comentários`
      }
      return ''
    }
  },

  methods: {
    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    },
    async likePost () {
      if (this.auth) {
        await client.events.likeEvent(this.item.id)
        this.like = true
        this.likeCount += 1
      }
    },
    async unlikePost () {
      await client.events.unlikeEvent(this.item.id)
      this.like = false
      this.likeCount -= 1
    },
    async postComment (text) {
      try {
        const myNewComment = await client.events.newComment(this.item.id, text)
        this.comments.unshift(myNewComment)
        this.commentCount += 1
        this.alreadyRenderedCommentsIds.add(myNewComment.id)
      } catch (e) {
        console.error(e)
      }
    },
    async loadMoreComments (beforeId, size) {
      try {
        const moreComments = await client.events.getComments(this.item.id, beforeId, size)
        const moreCommentsClean = []
        for (const newComment of moreComments) {
          if (!this.alreadyRenderedCommentsIds.has(newComment.id)) {
            moreCommentsClean.push(newComment)
          }
        }
        this.comments = [...this.comments, ...moreCommentsClean]
      } catch (e) {
        console.error(e)
      }
    },
    async deleteComment (commentId) {
      try {
        for (let ci = 0; ci < this.comments.length; ci++) {
          if (this.comments[ci].id === commentId) {
            this.comments.splice(ci, 1)
          }
        }
        await client.events.deleteComment(this.item.id, commentId)
        this.commentCount -= 1
      } catch (e) {
        console.error(e)
      }
    },
    async deleteEvent () {
      try {
        // delete in backend
        await client.events.deleteEvent(this.item.id)
        // delete in frontend
        this.$emit('delete-event', this.item.id)
      } catch (e) {
        console.error(e)
      }
    },
    login () {
      const state = { to: this.$router.currentRoute.path }
      this.$store.dispatch(LOGIN, state)
    },
    humanTime (timestamp) {
      return client.utils.humanTime(timestamp)
    }
  },

  async created () {
    this.like = this.item.like
    this.likeCount = this.item.likeCount
    this.comments = await client.events.getComments(this.item.id, null, 7)
    this.commentCount = this.item.commentCount
    this.userEndpointAddr = `/users/${this.item.owner.username}`
  }
}
</script>
