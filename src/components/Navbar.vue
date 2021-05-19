<template>
  <b-navbar sticky toggleable="sm" id="navbarStyle" type="dark">
    <!-- Homme button -->
    <b-navbar-brand to="/">
      <img src="@/assets/logo512x512.png" width="32" alt="Monneda" />
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav>
      <Search index="users" :hits="4" style="max-width: 12rem" />
    </b-navbar-nav>

    <!-- Toggle navbar button -->
    <b-navbar-toggle target="collapse" />

    <!-- All items of navbar -->
    <b-collapse class="text-center" id="collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button size="sm" class="cartera-blue-button">
            Nova carteira
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <!-- Login -->
          <b-button size="sm" class="cartera-blue-button" variant="outline-light" v-if="auth" @click="logout">
            Sair
          </b-button>

          <!-- Logout -->
          <b-button size="sm" class="cartera-blue-button" variant="outline-light" v-else @click="login">
            Entrar
          </b-button>
        </b-nav-item>

        <!-- Profile button -->
        <b-nav-item v-if="auth" :to="`/users/${user.username}`">
          <b-avatar rounded size="2rem" :src="user.picture" />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Search from '@/components/Search'
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
  name: 'Navbar',

  components: {
    Search
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    }
  },

  methods: {
    login () {
      const state = { to: this.$router.currentRoute.path }
      this.$store.dispatch(LOGIN, state)
    },
    logout () {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style scoped>
/* Small devices (mobile & Tablet, 575px and below) */
@media only screen and (max-width: 575px) {
  #navbarStyle {
    height: auto;
    background-color: #4e79a7;
  }
}

/* Medium devices (desktops, 576px and up) */
@media only screen and (min-width: 576px) {
  #navbarStyle {
    height: 45px;
    background-color: #4e79a7;
  }
}
</style>
