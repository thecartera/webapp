<template>
    <b-nav-item-dropdown
      no-caret
      :size="small ? 'sm' : 'md'"
      title="Convidar amigo(a)"
      right
      variant="primary"
      class="pt-1 mx-1"
    >
      <template #button-content>
        <b-row align-h="center" class="m-0 p-0">
          <b-icon scale="1" variant="white" icon="bell"></b-icon>
        </b-row>
        <b-row v-if="text" align-h="center" class="m-0 p-0">
          <span class="text-white"> Notificações </span>
        </b-row>
      </template>

      <b-dropdown-item :to="`/users/bueno`" v-for="notification in notifications" :key="notification.id">
        <b-row align-h="start">
          <b-nav-item :to="`/users/bueno`">
            <b-avatar :src="notification.user.picture" icon="person-circle" variant="dark"/>
            <span class="text-dark"> {{ notification.user.name }} </span>
            <span class="text-dark"> comentou no seu post </span>
          </b-nav-item>
        </b-row>
      </b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>

export default {
  name: 'Notifications',

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
