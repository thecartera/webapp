<template>
  <b-navbar class="navbarsize" sticky toggleable="lg" type="dark" variant="info">

    <b-navbar-brand :to="{ path: '/wallets'}">
      <img src="../assets/logo.png" style="widht: 2rem; height: 2rem" alt="Monneda">
    </b-navbar-brand>

    <b-navbar-nav small>
      <b-nav-item :to="{ path: '/wallets' }">
        <b-button pill size="sm" variant="info">
          <b-iconstack>
            <b-icon variant="light" icon="wallet2" shift-h="-2" shift-v="2"></b-icon>
            <b-icon variant="light" icon="plus" shift-v="1" shift-h="-2"></b-icon>
          </b-iconstack>
        </b-button>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <b-nav-item :to="{ path: '/login' }">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
          <!-- show login when not authenticated -->
          <b-button pill size="sm" variant="outline-light" v-if="!$auth.isAuthenticated" @click="login">Entrar</b-button>
          <!-- show logout when authenticated -->
          <b-button pill size="sm" variant="outline-light" v-if="$auth.isAuthenticated" @click="logout">Sair</b-button>
        </div>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <b-nav-form @keyup.enter.prevent="submit(searchBarValue)">
        <b-input-group size="sm">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          style="width:10rem"
          placeholder="@user"
          v-model="searchBarValue">
        </b-form-input>
        </b-input-group>
        <!-- <b-button
          variant="outline-light"
          size="sm"
          class="my-2 my-sm-0"
          type="submit"
          :to="{ path: `/users/${this.searchBarValue}` }">Ver perfil
        </b-button> -->
      </b-nav-form>
     </b-navbar-nav>

    <b-navbar-nav small class="ml-auto">
      <div v-if="!$auth.loading">
        <b-nav-item v-if="$auth.isAuthenticated" :to="{ path: `/users/${this.userData.username}` }">
          <b-avatar :src=userData.picture style="width: 2rem; height: 2rem"></b-avatar>
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

  data: () => ({
    searchBarValue: ''
  }),

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
    },
    async submit (searchBarValue) {
      this.$router.push(`/users/${searchBarValue}`)
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
