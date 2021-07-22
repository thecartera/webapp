<template>
    <b-nav-item-dropdown
      no-caret
      size="md"
      right
      variant="primary"
      menu-class="scrollable-menu"
    >
      <template #button-content>
        <b-row align-h="center" class="m-0 p-0 pt-1" @click="getNotifications" >
          <b-avatar
            size="md"
            :badge="unreadNotificationsCount > 0 ? unreadNotificationsCount : null"
            badge-top
            variant="primary"
            :badge-variant="unreadNotificationsCount > 0 ? 'red' : 'primary'"
            icon="bell"
          >
          </b-avatar>
        </b-row>
      </template>

      <b-dropdown-item
        v-for="notification in notifications"
        :key="notification.id"
        class="p-0 m-0"
      >
        <Notification :notification="notification"/>
      </b-dropdown-item>
      <p class="invisible" v-b-visible="loadMoreNotifications"></p>
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
    showing: false
  }),

  props: {
    unreadNotificationsCount: {
      type: String,
      required: true
    }
  },

  methods: {
    async loadMoreNotifications () {
      if (this.notifications.length === 0 || this.notifications[0].type === 'DUMMY') {
        return
      }

      const lastId = this.notifications[this.notifications.length - 1].id
      const newItems = await client.notifications.getNotifications(5, lastId)
      this.notifications = [...this.notifications, ...newItems]
    },
    async getNotifications () {
      this.show = !this.show
      if (!this.show) {
        return
      }
      let notifications = await client.notifications.getNotifications(10)
      if (notifications.length === 0) {
        notifications = client.utils.getDummyNotification()
      }
      this.notifications = notifications
      this.$emit('notificationsFetched')
    }
  }
}
</script>

<style>
.scrollable-menu {
  height: auto;
  max-height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
