<template>
  <b-navbar sticky toggleable="sm" variant="info">
    <!-- Homme button -->
    <b-navbar-brand to="/">
      <img src="@/assets/logo40x40.png" alt="Monneda" />
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav>
      <b-input-group prepend="@">
        <b-form-input
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
    <b-collapse id="collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button variant="info">
            <b-iconstack variant="light">
              <b-icon icon="wallet2" shift-h="-2" shift-v="2" />
              <b-icon icon="plus" shift-v="1" shift-h="-2" />
            </b-iconstack>
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <b-button variant="info" v-if="auth" @click="logout">
            Sair
          </b-button>
          <b-button variant="info" v-else @click="login">
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
