<template>
  <b-navbar sticky toggleable="sm" style="background-color: #4e79a7" type="dark">
    <!-- Homme button -->
    <b-navbar-brand to="/">
      <img src="@/assets/new-logo-clean.png" width="40" alt="Monneda" />
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav style="max-width: 12rem">
      <b-input-group size="sm">
        <b-form-input
          size="sm"
          placeholder="Username"
          @keypress.enter.prevent="search"
          v-model="searchBarValue"
        >
        </b-form-input>
      </b-input-group>
    </b-navbar-nav>

    <!-- Toggle navbar button -->
    <b-navbar-toggle target="collapse" />

    <!-- All items of navbar -->
    <b-collapse class="text-center" id="collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button variant="outline-light">
            Nova carteira
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <b-button variant="outline-light" v-if="auth" @click="logout">
            Sair
          </b-button>
          <b-button variant="outline-light" v-else @click="login">
            Entrar
          </b-button>
        </b-nav-item>

        <!-- Profile button -->
        <b-nav-item v-if="auth" :to="this.userUrl">
          <b-avatar :src="user.picture" />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
  name: 'Navbar',

  data: () => ({
    searchBarValue: ''
  }),

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    },
    userUrl () {
      return `/users/${this.user.nickname}`
    }
  },

  methods: {
    login () {
      const state = { to: this.$router.currentRoute.path }
      this.$store.dispatch(LOGIN, state)
    },
    logout () {
      this.$store.dispatch(LOGOUT)
    },
    search () {
      this.$router.push(`/users/${this.searchBarValue}`)
    }
  }
}
</script>
