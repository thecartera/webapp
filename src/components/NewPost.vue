<template>
  <b-card>
    <b-card-title> New post </b-card-title>
    <b-card-body>
      <b-form>
        <b-form-input placeholder="New post" v-model="text" />
        <b-button variant="info"> Post </b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'NewPost',

  data: () => ({
    text: ''
  })
}
</script>
