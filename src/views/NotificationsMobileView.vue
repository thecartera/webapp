<template>
  <div>
    <FollowsNavbar />

    <ThreeColumnsLayout>
      <NotificationsMobile
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
  </ThreeColumnsLayout>
</div>
</template>

<script>
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
    notifications: [
      {
        id: '60f5ff2419a354187d3107b4',
        createdAt: '2021-07-19T22:39:32.823Z',
        viewedAt: null,
        user: {
          name: 'Cartera',
          picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj5JobFdjJ73FMYf5TxDDcMBEKEs4__x5amH4gU=s96-c',
          username: 'monnedanetwork',
          title: '',
          following: false
        },
        type: 'USER_TAGGED_COMMENT_EVENT',
        data: {
          eventId: '60f5dbf4a89e132aed1ee790',
          text: 'Irado essa carteira eim.@Bueno, @Mauricio, @ramna@JOAO tá enviando notificação pra todo mundo'
        }
      },
      {
        id: '60f5ff2419a354187d3107b5',
        createdAt: '2021-07-19T22:39:32.823Z',
        viewedAt: null,
        user: {
          name: 'Cartera',
          picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj5JobFdjJ73FMYf5TxDDcMBEKEs4__x5amH4gU=s96-c',
          username: 'monnedanetwork',
          title: '',
          following: false
        },
        type: 'USER_TAGGED_COMMENT_EVENT',
        data: {
          eventId: '60f5dbf4a89e132aed1ee790',
          text: 'Irado essa carteira eim.@Bueno, @Mauricio, @ramna@JOAO tá enviando notificação pra todo mundo'
        }
      }
    ]
  }),

  props: {
    text: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  }

}
</script>
