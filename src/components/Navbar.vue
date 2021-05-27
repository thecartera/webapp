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

        <!-- Home button -->
        <b-nav-item v-if="auth" to="/">
          <b-button class="max-height" size="md" variant="primary">
            <b-iconstack scale="1">
              <b-icon stacked icon="house-door"></b-icon>
              <b-icon stacked icon="house"></b-icon>
            </b-iconstack>
            <span> Feed </span>
          </b-button>
        </b-nav-item>

        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button class="max-height" v-if="auth" size="md" variant="primary">
            Nova <span style="color: lime"> Cartera </span>
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <!-- Login -->
          <b-button
            size="md"
            class="max-height"
            variant="primary"
            v-if="auth"
            @click="logout"
          >
            Sair
          </b-button>

          <!-- Logout -->
          <b-button
            size="md"
            class="max-height"
            variant="primary"
            v-else
            @click="login"
          >
            Entrar
          </b-button>
        </b-nav-item>

        <!-- Profile button -->
        <b-nav-item v-if="auth" :to="`/users/${user.username}`">
          <b-button class="max-height" variant="primary">
            <b-avatar size="2rem" :src="user.picture" />
          </b-button>
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
  #navbarStyle {
    height: 45px;
    background-color: #4e79a7;
  }
}
</style>
