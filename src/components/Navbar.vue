<template>
  <b-navbar sticky variant="info">
    <b-navbar-brand href="#"> Monneda </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item to="/feed"> Feed </b-nav-item>
      <b-nav-item href="#"> Network </b-nav-item>
      <b-nav-item href="#"> Events </b-nav-item>
      <b-nav-item href="#"> Chat </b-nav-item>
      <b-nav-item href="#"> Notifications </b-nav-item>
      <b-nav-item href="#"> Hashtags </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/me"> Account </b-nav-item>
      <b-nav-item href="#"> Wallets </b-nav-item>
      <b-nav-item href="#"> Settings </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
