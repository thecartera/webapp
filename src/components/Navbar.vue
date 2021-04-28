<template>
  <b-navbar sticky toggleable="sm" id="navbarStyle" type="dark">
    <!-- Homme button -->
    <b-navbar-brand to="/">
      <img src="@/assets/new-logo-clean.png" width="32" alt="Monneda" />
    </b-navbar-brand>

    <!-- Search bar -->
    <b-navbar-nav style="max-width: 12rem">
        <ais-instant-search :search-client="searchClient" index-name="users">
          <ais-configure :hits-per-page.camel="4"/>
          <ais-search-box v-model="searchBarValue">
            <b-input-group size="sm">
              <b-form-input
                size="sm"
                placeholder="Encontre seus amigos"
                @keypress.enter.prevent="search"
                v-model="searchBarValue"
              >
              </b-form-input>
            </b-input-group>
          </ais-search-box>
          <ais-hits>
            <template slot-scope="{ items }" style="margin-top 10rem">
              <b-dropdown-group v-show="searchBarValue" style="position: absolute; background-color: #ddd; border-radius: 0.5rem">
                <b-dropdown-item-button v-for="item in items" :key="item.username" @click="searchFromButton(item.username)">
                  <b-row>
                    <b-col cols="auto" style="padding: 0rem 0.5rem 0rem 0rem">
                      <b-avatar :src="item.picture" />
                    </b-col>
                    <b-col>
                      <b-row>
                        <span style="font-size: 0.9rem; font-weight: bold" class="username"> @{{ item.username }} </span>
                      </b-row>
                      <b-row>
                        <span
                          style="font-size: 0.8rem"
                          class="name">
                            {{ item.name.length > 25 ? item.name.substring(0, 22) + '...' : item.name }}
                        </span>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-dropdown-item-button>
              </b-dropdown-group>
            </template>
          </ais-hits>
        </ais-instant-search>
    </b-navbar-nav>

    <!-- Toggle navbar button -->
    <b-navbar-toggle target="collapse" />

    <!-- All items of navbar -->
    <b-collapse class="text-center" id="collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- Create wallet button -->
        <b-nav-item to="/wallets">
          <b-button size="sm" variant="outline-light">
            Nova carteira
          </b-button>
        </b-nav-item>

        <!-- Login/logout buttons -->
        <b-nav-item>
          <b-button size="sm" variant="outline-light" v-if="auth" @click="logout">
            Sair
          </b-button>
          <b-button size="sm" variant="outline-light" v-else @click="login">
            Entrar
          </b-button>
        </b-nav-item>

        <!-- Profile button -->
        <b-nav-item v-if="auth" :to="this.userUrl">
          <b-avatar style="height: 2rem; width: 2rem" :src="user.picture" />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
  name: 'Navbar',

  data: () => ({
    searchBarValue: '',
    searchClient: instantMeiliSearch(
      'https://meili-router-g93ldnbwwqkk4n6o-gtw.qovery.io/',
      '9625a71bb5d6a90cee15060ed621a91f2f7fcb9e68c12a3e55918bd3c6029b24'
    )
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
      let searchString = this.searchBarValue.toLowerCase()
      if (searchString[0] === '@') {
        searchString = searchString.substring(1)
      }
      this.$router.push(`/users/${searchString}`)
    },
    searchFromButton (username) {
      this.searchBarValue = ''
      this.$router.push(`/users/${username}`)
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
