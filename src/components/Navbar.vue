<template>
  <b-navbar class="navbarsize" sticky toggleable="lg" type="dark" variant="info">

    <b-navbar-brand to="/wallets">
      <img src="@/assets/logo.png" style="widht: 2rem; height: 2rem" alt="Monneda">
    </b-navbar-brand>

    <b-navbar-nav small>
      <b-nav-item to="/wallets">
        <b-button pill size="sm" variant="info">
          <b-iconstack>
            <b-icon variant="light" icon="wallet2" shift-h="-2" shift-v="2" />
            <b-icon variant="light" icon="plus" shift-v="1" shift-h="-2" />
          </b-iconstack>
        </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <b-nav-item to="/login">
        <!-- show logout when authenticated -->
        <b-button pill size="sm" variant="outline-light" v-if="auth" @click="logout"> Sair </b-button>
        <!-- show login when not authenticated -->
        <b-button pill size="sm" variant="outline-light" v-else @click="login"> Entrar </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <b-nav-form @keyup.enter.prevent="search">
        <b-input-group size="sm">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          style="width:10rem"
          placeholder="@user"
          v-model="searchBarValue">
        </b-form-input>
        </b-input-group>
      </b-nav-form>
     </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <b-nav-item v-if="auth" :to="`/users/${this.user.nickname}`">
        <b-avatar :src=user.picture style="width: 2rem; height: 2rem"></b-avatar>
      </b-nav-item>
    </b-navbar-nav>

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
      this.$store.dispatch(LOGIN)
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

<style scoped>

.navbarsize {
  min-height: 2.6rem;
  max-height: 2.6rem;
  padding: 0rem 0.25rem 0.2rem 0.25rem;
}

</style>
