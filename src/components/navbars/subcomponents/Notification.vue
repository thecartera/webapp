<template>
  <b-row align-h="start" @click="redirect">
    <b-nav-item>
      <b-avatar v-if="thumb" :src="thumb" icon="person" variant="primary"/>
      <b class="text-dark"> {{ actorUsername }} </b>
      <span class="text-dark"> {{ text }} </span>
      <span v-if="timestamp" class="text-secondary"> {{ timestamp }} </span>
    </b-nav-item>
  </b-row>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'Notification',

  data: () => ({
    actorUsername: '',
    text: '',
    thumb: '',
    timestamp: '',
    redirectLink: ''
  }),

  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  methods: {
    redirect () {
      if (this.redirectLink) {
        this.$router.replace(this.redirectLink)
      }
    }
  },

  mounted () {
    this.actorUsername = this.notification.user.username
    this.thumb = this.notification.user.picture
    this.timestamp = client.utils.simpleHumanTime(this.notification.createdAt)
    this.text = client.utils.generateNotificationText(this.notification.type)
    this.redirectLink = client.utils.generateNotificationRedirectLink(this.notification)
  }
}
</script>
