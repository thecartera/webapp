<template>
  <b-card class="userDataCardSize">
    <b-row align-h="start">
      <b-col cols="auto">
        <b-avatar :src=userData.picture size="6em"></b-avatar>
        <p style="text-align:center">
          <b-icon style="text-align:center" scale="0.8" icon="cursor-fill" variant="info" aria-hidden="true"></b-icon>
          <span style="font-size:0.8rem;color:gray">{{ userData.location }}</span>
        </p>
      </b-col>
      <b-col style="text-align:left" cols="0">
        <span style="font-size:1.4rem"><strong>@{{ userData.username }} </strong>
          <b-icon icon="patch-check-fill" scale="0.7" variant="info"></b-icon>
        </span>
        <br>
        <span style="font-size:1rem"><b>{{ userData.name }}</b></span>
        <!-- <br>
        <span style="font-size:0.75rem;color:#666"><b>{{ userData.title }}</b></span>
        <br> -->
        <b-card class="descriptionCardSize" no-body border-variant="dark" align="left">
          <span style="white-space: pre;font-family:Arial">{{ userData.description }}</span>
        </b-card>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    userData: {
      default: () => (
        {
          user: '',
          name: '',
          title: '',
          description: '',
          photoURL: '',
          location: ''
        }
      ),
      type: Object
    }
  }
}
</script>

<style scoped>

.descriptionCardSize {
  min-width: 20rem;
  max-width: 20rem;
  min-height: 7rem;
  max-height: 7rem;
  margin: auto;
}

.userDataCardSize {
  min-height: 13rem;
  max-height: 13rem;
  margin: auto;
}

</style>
