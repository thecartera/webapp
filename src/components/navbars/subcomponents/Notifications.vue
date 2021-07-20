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
          <b-icon scale="1" variant="white" icon="bell"></b-icon>
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

export default {
  name: 'Notifications',

  components: {
    Notification
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
        id: '60f5c7d84e36790ece871c53',
        createdAt: '2021-07-19T18:43:36.536Z',
        viewedAt: null,
        user: {
          name: 'Cartera',
          picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj5JobFdjJ73FMYf5TxDDcMBEKEs4__x5amH4gU=s96-c',
          username: 'monnedanetwork',
          title: '',
          following: true
        },
        type: 'USER_COMMENT_EVENT',
        data: {
          eventId: '60f0482ef9e1973070108bb0',
          text: 'irado'
        }
      },
      {
        id: '60f5be09abc3bb52cd53728c',
        createdAt: '2021-07-19T18:01:45.917Z',
        viewedAt: null,
        user: {
          name: 'Cartera',
          picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj5JobFdjJ73FMYf5TxDDcMBEKEs4__x5amH4gU=s96-c',
          username: 'monnedanetwork',
          title: '',
          following: true
        },
        type: 'USER_FOLLOWED',
        data: null
      },
      {
        id: '60f5bc21abc3bb52cd537289',
        createdAt: '2021-07-19T17:53:37.790Z',
        viewedAt: null,
        user: {
          name: 'Cartera',
          picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj5JobFdjJ73FMYf5TxDDcMBEKEs4__x5amH4gU=s96-c',
          username: 'monnedanetwork',
          title: '',
          following: true
        },
        type: 'USER_LIKE_EVENT',
        data: {
          eventId: '60f0482ef9e1973070108bb0'
        }
      }
    ]
  })

}
</script>
