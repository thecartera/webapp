<template>
  <b-container id="screenSize">
    <!-- User -->
    <b-card class="p-2 mt-2 border-color" no-body>
      <b-row style="background-color: #2c2f4b">
        <!-- Image -->
        <b-col cols="auto">
          <b-avatar rounded :src="profile.picture" size="5rem" />
        </b-col>

        <!-- User information -->
        <b-col class="pl-2">
          <b-row>
            <!-- Username -->
            <b-col cols="9" align-self="center">
              <b-row>
                <strong> {{ profile.username }} </strong>
              </b-row>
            </b-col>

            <!-- Edit profile -->
            <b-col cols="3">
              <!-- Edit profile off -->
              <b-row align-h="end" class="pr-3"
                v-if="id === user.username"
              >
                <b-button
                  size="sm"
                  variant="outline-light"
                  @click="showModal"
                >
                  <b-icon icon="pencil-square" variant="secondary"/>
                </b-button>
                <EditProfile ref="editProfileModal"/>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="mr-2" style="background-color: blue; line-height: 0.8rem; text-align: center; margin-top: 0.5rem" >
            <!-- Followers/Follows -->
            <b-col cols="auto" md="6" style="background-color: red">
              <b-row align-h="center" style="background-color: black" >
                <!-- Followers count -->
                <b-col cols="auto" style="background-color: pink" class="follow-list-clickable" @click="gotoFollowers(id)">
                  <span id="followers-list" style="font-size: 0.8rem">
                    {{ followersCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.65rem; color: grey"> seguidores </span>
                </b-col>

                <b-col cols="0"/>

                <!-- Following count -->
                <b-col cols="auto" style="background-color: purple" class="follow-list-clickable" @click="gotoFollowing(id)">
                  <span id="following-list" style="font-size: 0.8rem">
                    {{ profile.followingCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.65rem; color: grey"> seguindo </span>
                </b-col>
              </b-row>
            </b-col>

            <!-- Unfollow Button-->
            <b-col cols="auto" md="6" v-if="id !== user.username" style="background-color: yellow; width: 3rem">
              <!-- Unfollow -->
              <b-button
                size="sm"
                id="unfollow-confirmation"
                v-if="profile.following"
                @click="unfollow"
                variant="outline-secondary"
              >
                Seguindo
              </b-button>
              <b-button
                size="sm"
                variant="success"
                v-else
                @click="follow">
                <b> Seguir </b>
              </b-button>
            </b-col>
          </b-row>

        </b-col>
      </b-row>

      <!-- Full Name -->
      <b-row>
        <b-col align-self="end">
          <span style="font-size: 0.8rem; font-weight: 600">
            {{ profile.name }}
          </span>
        </b-col>
      </b-row>
    </b-card>

    <!-- Wallets -->
    <b-card style="border-color: #DBDAD7; margin-top: 0.5rem" title="Carteiras">
      <ul>
        <li v-for="item in normalizedWallets" :key="item.id">
          <b-link class="text-primary" :to="`/wallets/${item.id}`">
            {{ item.name }}
          </b-link>
          <b-icon
            icon="x"
            variant="dark"
            id="wallet-delete-icon"
            v-if="id === user.username"
            @click="showPopup(item.id, item.name)"
          />
        </li>

        <!-- Delete popover -->
        <b-popover placement="right" :show.sync="show" target="wallet-delete-icon" title="Excluir carteira">
          <p>
            Você deseja excluir:
            <strong> {{ selected.name }} </strong>
          </p>
          <div class="row justify-content-around">
            <b-button variant="danger" @click="deleteWallet"> Excluir </b-button>
            <b-button variant="secondary" @click="closePopup"> Cancelar </b-button>
          </div>
        </b-popover>
      </ul>
    </b-card>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'
import EditProfile from '@/components/EditProfile'
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'Profile',

  components: {
    EditProfile
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    profile: {},
    wallets: [],
    show: false,
    showUnfollow: false,
    selected: {},
    showFollowingList: false,
    followingList: Array,
    showFollowersList: false,
    followersList: Array,
    modalShow: true
  }),

  computed: {
    normalizedLocation () {
      return this.profile.location ? this.profile.location : 'Brasil'
    },
    normalizedDescription () {
      const descr = this.profile.description
      return descr ? descr.substring(0, 140) : ''
    },
    normalizedName () {
      return this.profile.name ? this.profile.name.substring(0, 25) : ''
    },
    normalizedUsername () {
      const username = this.profile.username
      return username ? '@' + username.substring(0, 16) : 'undefined'
    },
    normalizedTitle () {
      return this.profile.title ? this.profile.title.substring(0, 15) : ''
    },
    normalizedWallets () {
      return this.wallets.map((w, i) => ({ id: w.id, name: w.name }))
    },
    user () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    },
    followersCount () {
      return this.profile.followersCount
    },
    normalizedFollowingList () {
      return this.followingList
    },
    normalizedFollowersList () {
      return this.followersList
    }
  },

  methods: {
    async fetchProfileById (id) {
      this.profile = await client.users.fetchByUsername(id)
      this.wallets = await client.wallets.fetchByOwner(id)
    },
    async deleteWallet () {
      try {
        await client.wallets.deleteById(this.selected.id)
        const index = this.wallets.map(i => i.id).indexOf(this.selected.id)
        this.wallets.splice(index, 1)
      } catch (e) {
        console.error(e)
        // TODO: alert that it did not work
      } finally {
        this.closePopup()
      }
    },
    showPopup (id, name) {
      this.show = true
      this.selected.id = id
      this.selected.name = name
    },
    closePopup () {
      this.show = false
      this.selected = {}
    },
    async follow () {
      if (!this.$store.state.auth.auth) {
        const state = { to: this.$router.currentRoute.path }
        await this.$store.dispatch(LOGIN, state)
      } else {
        try {
          this.profile.following = true
          this.profile.followersCount += 1
          await client.users.follow(this.id)
        } catch (e) {
          console.error('falha ao seguir usuário. erro: ' + e)
        }
      }
    },
    async unfollow () {
      try {
        this.profile.following = false
        this.showUnfollow = false
        this.profile.followersCount -= 1
        await client.users.unfollow(this.id)
      } catch (e) {
        console.error('falha ao parar de seguir usuário. erro: ' + e)
      }
    },
    truncate (name) {
      if (name.length <= 25) {
        return name
      }
      return name.substring(0, 22) + '...'
    },
    gotoFollowers (id) {
      this.$router.push(`/users/${id}/followers`)
    },
    gotoFollowing (id) {
      this.$router.push(`/users/${id}/following`)
    },
    showModal () {
      this.$refs.editProfileModal.show()
    }
  },

  watch: {
    async id (newVal) { // watch if opening another user profile
      await this.fetchProfileById(newVal)
    }
  },

  async created () {
    await this.fetchProfileById(this.id)
  }
}
</script>

<style scoped>
.border-color {
  border-color: #DBDAD7
}

.follow-list-clickable {
  cursor: pointer;
}

/* Small devices (mobile & Tablet, 768px and below) */
@media only screen and (max-width: 768px) {
  #screenSize {
    width: 100%;
  }
}

/* Medium devices (desktops, 769px and up) */
@media only screen and (min-width: 769px) {
  #screenSize {
    width: 50%;
  }
}

</style>
