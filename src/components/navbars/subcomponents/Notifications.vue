<template>
    <b-nav-item-dropdown
      no-caret
      size="md"
      right
      variant="primary"
    >
      <template #button-content>
        <b-row align-h="center" class="m-0 p-0 pt-1" @click="getNotifications">
          <b-avatar
            size="md"
            :badge="unreadNotificationsCount > 0 ? unreadNotificationsCount : ''"
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
    notifications: []
  }),

  props: {
    unreadNotificationsCount: {
      type: String,
      required: true
    }
  },

  methods: {
    async getNotifications () {
      this.notifications = await client.notifications.getNotifications()
    }
  }
}
</script>
