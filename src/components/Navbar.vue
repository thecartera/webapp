<template>
  <b-navbar class="navbarsize" sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{ path: '/wallets'}">
      <img src="../assets/logo.png" width="40px" alt="Monneda">
      <!-- <p>Monneda</p> -->
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item :to="{ path: '/wallets' }">
        <b-button pill variant="outline-light">
          <b-icon icon="wallet2"></b-icon>
          <b-icon icon="plus"></b-icon>
        </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item :to="{ path: '/login' }">
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
      <div v-if="!$auth.loading">
        <b-nav-item v-if="$auth.isAuthenticated" :to="{ path: `/users/${this.userData.username}` }">
          <b-avatar :src=userData.picture></b-avatar>
        </b-nav-item>
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  props: {
    userData: {
      default: () => (
        {
          username: '',
          name: '',
          title: '',
          description: '',
          photoURL: '',
          location: ''
        }
      ),
      type: Object
    }
  },

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

<style scoped>

.navbarsize {
  min-height: 3.2rem;
  max-height: 3.2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
}

</style>
