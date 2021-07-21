<template>
    <b-nav-item-dropdown
      no-caret
      size="sm"
      right
      variant="primary"
      class="pt-1 mx-1"
    >
      <template #button-content>
        <b-row align-h="center" class="m-0 p-0">
          <b-icon scale="1" variant="white" @click="getNotifications" icon="bell"></b-icon>
        </b-row>
        <b-row align-h="center" class="m-0 p-0">
          <span class="text-white"> Notificações </span>
        </b-row>
      </template>

      <b-dropdown-item
        v-for="notification in notifications"
        :key="notification.id"
        class="p-0 m-0"
      >
        <Notification :notification="notification"/>
      </b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
import Notification from '@/components/navbars/subcomponents/Notification'
import client from '@/commons/client.api'

export default {
  name: 'Notifications',

  components: {
    Notification
  },

  data: () => ({
    notifications: [],
    unreadNotificationsCount: 0
  }),

  methods: {
    async getNotifications () {
      this.notifications = await client.notifications.getNotifications()
    }
  },

  async created () {
    this.notifications = await client.notifications.getNotifications()
    const count = await client.notifications.getUnreadNotificationsCount()
    this.unreadNotificationsCount = count.counter
  }

}
</script>
