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

        <!-- Profile button mobile -->
        <b-nav-item class="d-sm-none" v-if="auth" :to="`/users/${user.username}`">
          <b-button variant="primary">
            <b-icon icon="person-circle"/>
            <span class="text-white"> Perfil </span>
          </b-button>
        </b-nav-item>

        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button class="max-height" v-if="auth" size="md" variant="primary">
            <b-icon icon="plus" shift-h="16" shift-v="-1" scale="0.8"/>
            <b-icon icon="wallet2"/>
            Nova <span style="color: lime"> Cartera </span>
          </b-button>
        </b-nav-item>

        <InviteDropdown v-if="auth"/>

        <!-- Profile dropdown desktop -->
        <b-col
          v-if="auth"
          class="p-0 m-0 d-none d-sm-block"
          align-self="center"
        >
          <b-dropdown
            no-caret
            size="sm"
            variant="primary"
            style="height:43px"
            right
          >
            <template #button-content>
              <b-avatar size="2rem" :src="user.picture" />
            </template>

            <b-dropdown-item :to="`/users/${user.username}`">
              <b-row align-h="start">
                <b-nav-item :to="`/users/${user.username}`">
                  <b-icon icon="person-circle" variant="dark"/>
                  <span class="text-dark"> Perfil </span>
                </b-nav-item>
              </b-row>
            </b-dropdown-item>

            <b-dropdown-item href="https://forms.gle/9TBhQtpSSAzwfjQe7">
              <b-row align-h="start">
                <b-nav-item href="https://forms.gle/9TBhQtpSSAzwfjQe7">
                  <b-icon icon="question-circle" variant="dark"/>
                  <span class="text-dark">
                    Dúvida ou sugestão?
                  </span>
                </b-nav-item>
              </b-row>
            </b-dropdown-item>

            <b-dropdown-item to="/settings">
              <b-row align-h="start">
                <b-nav-item to="/settings">
                  <b-icon icon="gear-fill" variant="dark"/>
                  <span class="text-dark"> Configurações </span>
                </b-nav-item>
              </b-row>
            </b-dropdown-item>

            <b-dropdown-divider/>

            <b-dropdown-item
                class="max-height"
                size="md"
                variant="primary"
                @click="logout"
              >
              <b-row align-h="start">
                <b-nav-item>
                  <b-icon icon="box-arrow-left" variant="dark"/>
                  <span class="text-dark"> Sair </span>
                </b-nav-item>
              </b-row>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>

        <!-- Login -->
        <b-button
          size="md"
          class="max-height"
          variant="primary"
          v-else
          @click="login"
        >
          Entrar
        </b-button>

        <!-- Doubts and suggestions -->
        <b-nav-item class="d-sm-none" href="https://forms.gle/9TBhQtpSSAzwfjQe7">
          <b-button variant="primary">
            <b-icon icon="question-circle" variant="white"/>
            <span class="text-white">
              Dúvida ou sugestão?
            </span>
          </b-button>
        </b-nav-item>

        <!-- Settings -->
        <b-nav-item class="d-sm-none" to="/settings">
          <b-button variant="primary">
            <b-icon icon="gear-fill" variant="white"/>
            <span class="text-white"> Configurações </span>
          </b-button>
        </b-nav-item>

        <!-- Logout -->
        <b-nav-item class="d-sm-none">
          <b-button
            size="md"
            class="max-height"
            variant="primary"
            v-if="auth"
            @click="logout"
          >
            <b-icon icon="box-arrow-left" />
            Sair
          </b-button>
        </b-nav-item>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import InviteDropdown from '@/components/utils/InviteDropdown'
import Search from '@/components/utils/Search'
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
  name: 'Navbar',

  components: {
    Search,
    InviteDropdown
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

.bg-dropdown-color {
  background-color: #4e79a7
}

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
