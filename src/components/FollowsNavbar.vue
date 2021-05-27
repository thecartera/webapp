<template>
  <b-navbar sticky id="navbarHeight" variant="primary" type="dark">

    <!-- Back button -->
    <b-navbar-nav>
      <b-button @click="$router.go(-1)" size="md" variant="primary">
          <b-icon scale="1.5" icon="arrow-left"></b-icon>
      </b-button>
    </b-navbar-nav>

  </b-navbar>
</template>

<script>

export default {
  name: 'FollowsNavbar'

}
</script>

<style scoped>
.max-height {
  max-height:  45px;
  height: 45px;
  line-height: 1.2rem;
  overflow-y: hidden;
}

/* Small devices (mobile & Tablet, 575px and below) */
@media only screen and (max-width: 575px) {
  #navbarStyle {
    height: auto;
    background-color: #4e79a7;
  }
}

/* Medium devices (desktops, 576px and up) */
@media only screen and (min-width: 576px) {
  #navbarHeight {
    height: 45px;
  }
}
</style>
