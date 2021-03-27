<template>
  <b-card>
    <b-row align-h="start">
      <b-col cols="auto">
        <!-- <b-avatar variant="success" size="8em"></b-avatar> -->
        <b-avatar src="https://cdn.discordapp.com/attachments/750789539890462842/823663412906033172/1597514092736.png" size="10em"></b-avatar>
        <p style="text-align:center">
          <b-icon style="text-align:center" scale="0.8" icon="cursor-fill" variant="info" aria-hidden="true"></b-icon>
          <span style="font-size:0.8rem;color:gray">{{ userData.location }}</span>
        </p>
      </b-col>
      <b-col style="text-align:left" cols="0">
        <span style="font-size:1.75rem"><strong>{{ userData.user }}<b-icon icon="patch-check-fill" scale="0.7" variant="info"></b-icon></strong></span>
        <p></p>
        <span style="font-size:1.25rem"><b>{{ userData.name }}</b></span>
        <br>
        <span style="font-size:0.75rem;color:#666"><b>{{ userData.title }}</b></span>
        <br>
        <span style="white-space: pre;font-family:Arial">{{ userData.description }}</span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    userData: {
      default: () => (
        {
          user: '',
          name: '',
          title: '',
          description: '',
          location: ''
        }
      ),
      type: Object
    }
  }
}
</script>

<style>

</style>
