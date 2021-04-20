<template>
  <b-navbar class="navbarsize" sticky toggleable="sm" type="dark" variant="info">
    <!-- Homme button -->
    <b-navbar-brand to="/">
      <img src="@/assets/logo40x40.png" alt="Monneda">
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav>
      <b-input-group size="sm" prepend="@">
        <b-form-input
          class="mr-sm-2"
          placeholder="Username"
          @keypress.enter.prevent="search"
          v-model="searchBarValue"
          size="sm">
        </b-form-input>
      </b-input-group>
    </b-navbar-nav>

    <b-navbar-toggle target="collapse" />
    <b-collapse id="collapse" is-nav>

      <b-navbar-nav class="ml-auto">
        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button block size="sm" variant="info">
            <b-iconstack>
              <b-icon variant="light" icon="wallet2" shift-h="-2" shift-v="2" />
              <b-icon variant="light" icon="plus" shift-v="1" shift-h="-2" />
            </b-iconstack>
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <b-button block size="sm" variant="info" v-if="auth" @click="logout">
            Sair
          </b-button>
          <b-button block size="sm" variant="info" v-else @click="login">
            Entrar
          </b-button>
        </b-nav-item>

        <!-- Profile button -->
        <b-nav-item v-if="auth" :to="`/users/${this.user.nickname}`">
          <div class="row justify-content-center">
            <b-avatar :src="user.picture" style="width: 2rem; height: 2rem"></b-avatar>
          </div>
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
