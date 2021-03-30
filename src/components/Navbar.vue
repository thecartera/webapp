<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <img src="../assets/logo.png" width="40px" alt="Monneda">
      <!-- <p>Monneda</p> -->
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item href="#/wallets/">
        <b-button pill variant="outline-light">
          <b-icon icon="wallet2"></b-icon> Nova Carteira
        </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#/login/">
        <b-button pill variant="outline-light"> Login </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#/register/">
        <b-button pill variant="outline-light"> Register </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item>
        <b-button pill variant="outline-light">
          <b-icon icon="person-fill"></b-icon> Perfil
        </b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
