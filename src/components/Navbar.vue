<template>
  <b-navbar sticky variant="info">
    <b-navbar-brand href="#"> Monneda </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item href="#"> Feed </b-nav-item>
      <b-nav-item href="#"> Network </b-nav-item>
      <b-nav-item href="#"> Events </b-nav-item>
      <b-nav-item href="#"> Chat </b-nav-item>
      <b-nav-item href="#"> Notifications </b-nav-item>
      <b-nav-item href="#"> Hashtags </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" placeholder="Search" />
        <b-button size="sm"> Search </b-button>
      </b-nav-form>
      <b-nav-item href="#"> Account </b-nav-item>
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
