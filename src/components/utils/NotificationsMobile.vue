<template>
  <b-card
    no-body
    @click="$router.replace(redirectLink)"
    class="mt-1 p-1"
    bg-variant="cartera-blue"
    border-variant="cartera-blue"
  >
    <b-row>
      <b-col class="pr-0" cols="auto" align-h="start">
        <b-avatar :src="thumb" icon="person" variant="primary"/>
      </b-col>
      <b-col class="px-1" align-self="center" style="line-height:1.1rem">
        <b-row class="ml-0 mr-2 px-1">
          <span>
            <b> {{ actorUsername }} </b>
            <span> {{ text }} </span>
            <span class="text-secondary"> {{ timestamp }} </span>
          </span>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'NotificationsMobile',

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

  mounted () {
    this.actorUsername = this.notification.user.username
    this.thumb = this.notification.user.picture
    this.timestamp = client.utils.simpleHumanTime(this.notification.createdAt)
    this.text = client.utils.generateNotificationText(this.notification.type)
    this.redirectLink = client.utils.generateNotificationRedirectLink(this.notification)
  }

}
</script>
