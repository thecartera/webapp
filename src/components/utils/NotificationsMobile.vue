<template>
  <b-card
    no-body
    @click="$router.replace('/users/bueno')"
    class="mt-1 p-1"
    bg-variant="cartera-blue"
    border-variant="cartera-blue"
  >
    <b-row>
      <b-col class="pr-0" cols="auto" align-h="start">
          <b-avatar :src="notification.user.picture" icon="person-circle" variant="dark"/>
      </b-col>
      <b-col class="pl-2" cols="auto" align-self="center">
          <span class="text-dark"> {{ notification.user.name }} </span>
          <span class="text-dark"> comentou no seu post </span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

export default {
  name: 'NotificationsMobile',

  props: {
    notification: {
      type: Object,
      required: true
    }
  }

}
</script>
