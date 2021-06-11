<template>
  <b-row align-v="center" class="vh-80" align-h="center">
    <b-icon
      variant="primary"
      icon="arrow-clockwise"
      animation="spin"
      font-scale="4"
    />
  </b-row>
</template>

<script>

export default {
  name: 'Loading',

  data: () => ({
    loading: true
  })
}
</script>

<style scoped>
.vh-80 {
  height: 80vh;
}
</style>
