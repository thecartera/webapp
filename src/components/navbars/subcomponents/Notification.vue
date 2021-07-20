<template>
  <b-row align-h="start" @click="$router.replace(redirectLink)">
    <b-nav-item>
      <b-avatar :src="thumb" icon="person-circle" variant="dark"/>
      <span class="text-dark"> {{ actorName }} </span>
      <span class="text-dark"> {{ text }} </span>
      <span class="text-secondary"> {{ timestamp }} </span>
    </b-nav-item>
  </b-row>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'Notification',

  data: () => ({
    actorName: '',
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

  mounted () {
    this.actorName = this.notification.user.name
    this.thumb = this.notification.user.picture
    this.timestamp = client.utils.simpleHumanTime(this.notification.createdAt)
    this.text = client.utils.generateNotificationText(this.notification.type)
    this.redirectLink = client.utils.generateNotificationRedirectLink(this.notification)
  }
}
</script>
