<template>
  <div>
    <FollowsNavbar />

    <ThreeColumnsLayout>
      <NotificationsMobile
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
      <p class="invisible" v-b-visible="loadMoreNotifications"></p>
  </ThreeColumnsLayout>
</div>
</template>

<script>
import client from '@/commons/client.api'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'
import FollowsNavbar from '@/components/navbars/FollowsNavbar'
import NotificationsMobile from '@/components/utils/NotificationsMobile'

export default {
  name: 'NotificationsMobileView',

  components: {
    FollowsNavbar,
    NotificationsMobile,
    ThreeColumnsLayout
  },

  data: () => ({
    notifications: []
  }),

  methods: {
    async getNotifications () {
      this.notifications = await client.notifications.getNotifications()
    },
    async loadMoreNotifications () {
      if (this.notifications.length === 0 || this.notifications[0].type === 'DUMMY') {
        return
      }
      const lastId = this.notifications[this.notifications.length - 1].id
      const newItems = await client.notifications.getNotifications(10, lastId)
      this.notifications = [...this.notifications, ...newItems]
    }
  },

  async created () {
    let notifications = await client.notifications.getNotifications(20)
    if (notifications.length === 0) {
      notifications = client.utils.getDummyNotification()
    }
    this.notifications = notifications
  }
}
</script>
