<template>
  <b-navbar sticky toggleable="sm" id="navbarStyle" type="dark" class="px-2 py-0 m-0">
    <!-- Logo button -->
    <b-navbar-brand to="/" class="pl-0 pr-1 m-0">
      <img src="@/assets/logo512x512.png" width="50" alt="Monneda" />
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav>
      <Search index="users" :hits="4" style="max-width: 11rem" />
    </b-navbar-nav>

    <!-- Notifications button on mobile (small-sized screens and smaller) -->
    <b-button to="/notifications" variant="primary" class="d-sm-none py-0 pl-1 pr-0 m-0">
      <b-avatar
        icon="bell"
        :badge="unreadNotificationsCount > 0 ? unreadNotificationsCount : null"
        badge-top
        variant="primary"
        :badge-variant="unreadNotificationsCount > 0 ? 'red' : 'primary'">
      </b-avatar>
    </b-button>

    <!-- Toggle navbar button -->
    <b-navbar-toggle target="collapse" style="border-color: #4e79a7; color: #fff">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-double-up"></b-icon>
        <b-icon v-else icon="chevron-double-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <!-- All items of navbar -->
    <b-collapse class="text-center" id="collapse" is-nav>

      <b-navbar-nav class="ml-auto">

        <!-- Home button -->
        <b-nav-item v-if="auth" to="/" class="pt-2 d-none d-sm-block">
        <b-row align-h="center" class="pt-1">
          <b-iconstack scale="1.5" shift-v="-3">
            <b-icon variant="white" stacked icon="house-door"></b-icon>
            <b-icon variant="white" stacked icon="chevron-up" shift-v="2.7" scale="1.2"></b-icon>
          </b-iconstack>
        </b-row>
        <b-row class="pt-2" align-h="center">
          <span class="text-white"> Feed </span>
        </b-row>
        </b-nav-item>

        <!-- Notifications button on desktop (medium-sized screens and larger) -->
        <Notifications
          :unreadNotificationsCount="unreadNotificationsCount"
          class="d-none d-sm-block pl-2"
          v-if="auth"
          @notificationsFetched="notificationsViewed"
        />

        <!-- Profile button mobile -->
        <b-nav-item class="d-sm-none" v-if="auth" :to="`/users/${user.username}`">
          <b-icon variant="white" icon="person-circle"/>
          <span class="text-white"> Perfil </span>
        </b-nav-item>

        <!-- New portfolio button mobile -->
        <b-nav-item class="d-sm-none" v-if="auth" :to="`/wallets`">
          <b-row align-h="center">
            <b-iconstack scale="0.65" shift-h="-3">
              <b-icon variant="white" icon="plus" shift-v="1" scale="0.8"/>
              <b-icon variant="white" shift-v="2" icon="wallet2"/>
            </b-iconstack>
            <span class="text-white pl-2"> Nova carteira </span>
          </b-row>
        </b-nav-item>

        <InviteDropdown v-if="auth" class="d-sm-none"/>

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
            right
          >
            <template #button-content>
              <b-avatar size="md" :src="user.picture" variant="primary" />
            </template>

            <b-dropdown-item :to="`/users/${user.username}`">
              <b-row align-h="start">
                <b-nav-item :to="`/users/${user.username}`">
                  <b-icon icon="person-circle" variant="dark"/>
                  <span class="text-dark"> Perfil </span>
                </b-nav-item>
              </b-row>
            </b-dropdown-item>

            <!-- Create wallet button -->
            <b-dropdown-item :to="`/wallets`">
              <b-row align-h="start">
                <b-nav-item :to="`/wallets`">
                  <b-iconstack scale="0.65" shift-h="-3">
                    <b-icon variant="dark" icon="plus" shift-v="1" scale="0.8"/>
                    <b-icon variant="dark" shift-v="2" icon="wallet2"/>
                  </b-iconstack>
                  <span class="text-dark"> Nova carteira </span>
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
import client from '@/commons/client.api'
import InviteDropdown from '@/components/utils/InviteDropdown'
import Notifications from '@/components/navbars/subcomponents/Notifications'
import Search from '@/components/utils/Search'
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
  name: 'Navbar',

  components: {
    Search,
    InviteDropdown,
    Notifications
  },

  data: () => ({
    unreadNotificationsCount: '0'
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
    notificationsViewed () {
      this.unreadNotificationsCount = '0'
    }
  },

  async created () {
    const count = await client.notifications.getUnreadNotificationsCount()
    this.unreadNotificationsCount = count.counter.toString()
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
    height: 60px;
    background-color: #4e79a7;
  }
}
</style>
