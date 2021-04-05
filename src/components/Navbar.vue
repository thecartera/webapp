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
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
          <!-- show login when not authenticated -->
          <b-button pill variant="outline-light" v-if="!$auth.isAuthenticated" @click="login">Login</b-button>
          <!-- show logout when authenticated -->
          <b-button pill variant="outline-light" v-if="$auth.isAuthenticated" @click="logout">Logout</b-button>
        </div>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#/register/">
        <b-button pill variant="outline-light"> Register </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="$auth.isAuthenticated" href="#/profile/">
        <b-button pill variant="outline-light">
          <b-icon icon="person-fill"></b-icon> Perfil
        </b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    // Log the user in
    login () {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>
