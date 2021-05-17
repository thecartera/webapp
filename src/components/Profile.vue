<template>
  <b-container id="screenSize" class="card-padding">
    <!-- User -->
    <b-card class="card-padding border-color" no-body>
      <b-row>
        <!-- Image -->
        <b-col cols="auto">
          <b-avatar rounded :src="profile.picture" size="4rem" />
        </b-col>

        <!-- User information -->
        <b-col>
          <b-row>
            <!-- Username -->
            <b-col cols="9" align-self="center">
              <b-row>
                <strong> @{{ profile.username }} </strong>
                <!-- <b-icon icon="patch-check-fill" class="cartera-blue-color" /> -->
                </b-row>
            </b-col>

            <!-- Edit profile -->
            <b-col cols="3">
              <!-- Edit profile off -->
              <b-row v-if="id === user.username && !editMode"
                align-h="center">
                <b-button size="sm" variant="outline-secondary" @click="editMode = true">
                  <b-icon icon="pencil-fill"/>
                </b-button>
              </b-row>
            </b-col>
          </b-row>

          <!-- Followers and Follows -->
          <b-row style="line-height: 0.8rem; text-align: center; margin-top: 0.5rem">
            <!-- Followers and Follows count -->
            <b-col cols="4" @click="getFollowers">
              <span id="followers-list" style="font-size: 0.8rem"> {{ followersCount }} </span>
              <br>
              <span style="font-size: 0.65rem; color: grey"> seguidores </span>
            </b-col>
            <b-col cols="4" @click="getFollowing">
              <span id="following-list" style="font-size: 0.8rem"> {{ profile.followingCount }} </span>
              <br>
              <span style="font-size: 0.65rem; color: grey"> seguindo </span>
            </b-col>
            <!-- SHOW FOLLOWING LIST -->
            <b-popover
              placement="left"
              :show.sync="showFollowingList"
              target="following-list">
              <b-container>
                <b-row align-v="center">
                  <b-col>
                    <b-row align-h="start">
                      <span style="font-size: 1.2rem; font-weight: 500"> Seguindo </span>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row align-h="end">
                      <b-icon icon="x" scale="2.5" @click="showFollowingList=false"/>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
              <b-dropdown-group class="dropdown" style="list-style: none; min-width: 13rem">
                <b-dropdown-item
                  v-for="following in normalizedFollowingList"
                  :key="following.username"
                  @click="showFollowingList = false"
                  :to="`/users/${following.username}`"
                >
                <b-row>
                  <!-- Picture -->
                  <b-col cols="auto" class="p-0 m-0">
                    <b-avatar size="sm" rounded :src="following.picture" />
                  </b-col>

                  <!-- Info -->
                  <b-col>
                    <p class="m-0 p-0 text-sm font-weight-bold">
                      @{{ following.username }}
                    </p>
                    <p class="m-0 p-0 text-sm">
                      {{ truncate(following.name) }}
                    </p>
                  </b-col>
                </b-row>
                </b-dropdown-item>
              </b-dropdown-group>
            </b-popover>
            <!-- SHOW FOLLOWERS LIST -->
            <b-popover
              placement="left"
              :show.sync="showFollowersList"
              target="followers-list">
              <b-container>
                <b-row align-v="center">
                  <b-col>
                    <b-row align-h="start">
                      <span style="font-size: 1.2rem; font-weight: 500"> Seguidores </span>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row align-h="end">
                      <b-icon icon="x" scale="2.5" @click="showFollowersList=false"/>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
              <b-dropdown-group class="dropdown" style="list-style: none; min-width: 13rem">
                <b-dropdown-item
                  v-for="follower in normalizedFollowersList"
                  :key="follower.username"
                  @click="showFollowersList = false"
                  :to="`/users/${follower.username}`"
                >
                <b-row>
                  <!-- Picture -->
                  <b-col cols="auto" class="p-0 m-0">
                    <b-avatar size="sm" rounded :src="follower.picture" />
                  </b-col>

                  <!-- Info -->
                  <b-col>
                    <p class="m-0 p-0 text-sm font-weight-bold">
                      @{{ follower.username }}
                    </p>
                    <p class="m-0 p-0 text-sm">
                      {{ truncate(follower.name) }}
                    </p>
                  </b-col>
                </b-row>
                </b-dropdown-item>
              </b-dropdown-group>
            </b-popover>
            <!-- Follow and Stop following button -->
            <b-col cols="x">
              <b-button
                v-if="!profile.following && id !== user.username"
                @click="follow"
                size="sm"
                class="cartera-green-button"
                >
                Seguir
              </b-button>
              <b-button
                v-if="profile.following && id !== user.username"
                @click="showUnfollow = true"
                @
                size="sm"
                id="unfollow-confirmation"
                >
                seguindo
              </b-button>
                <b-popover
                  placement="left"
                  :show.sync="showUnfollow"
                  title="Parar de seguir"
                  target="unfollow-confirmation">
                <p>
                  Você deseja parar de seguir
                  <strong> @{{ id }} </strong>?
                </p>
                <div class="row justify-content-around">
                  <b-button variant="danger" @click="unfollow"> Parar de seguir </b-button>
                  <b-button variant="secondary" @click="showUnfollow=false"> Cancelar </b-button>
                </div>
              </b-popover>
            </b-col>
          </b-row>

        </b-col>
      </b-row>

      <!-- Full Name -->
      <b-row>
        <b-col align-self="end">
          <span style="font-size: 0.8rem; font-weight: 600"> {{ profile.name }} </span>
        </b-col>
        <!-- Edit profile on -->
        <b-col v-if="id === user.username && editMode">
          <b-row align-h="end" style="margin-right:auto">
            <b-button
              style="margin-right: 1rem"
              size="sm"
              variant="outline-secondary"
              @click="cancelEdit">
              Cancelar
            </b-button>
            <b-button
              size="sm"
              variant="success"
              @click="updateProfile">
                Salvar
            </b-button>
          </b-row>
        </b-col>
      </b-row>

      <!-- Description -->
      <b-row style="white-space: pre-wrap; padding: 0rem 0rem 0rem 0.5rem">
        <span
          class="card-padding"
          v-if="!editMode"
          style="font-size: 0.9rem">{{ normalizedDescription }}
        </span>
          <b-form-textarea
            v-else
            :value="normalizedDescription"
            @update="onUpdate"
            placeholder="Adicione uma descrição"
            no-resize
            rows="3"
            size="sm"
          >
          </b-form-textarea>
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
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'Profile',

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
    editMode: false,
    newDescription: '',
    showFollowingList: false,
    followingList: Array,
    showFollowersList: false,
    followersList: Array
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
      return this.followingList
    }
  },

  methods: {
    async fetchProfileById (id) {
      this.profile = await client.users.fetchByUsername(id)
      // Quick bug fix. It was not fetching some wallets because description was null
      if (this.profile.description) {
        this.newDescription = this.profile.description.substring(0, 140)
      }
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
    async updateProfile () {
      try {
        const descr = [{ op: 'replace', path: '/description', value: this.newDescription }]
        await client.users.updateMyUser(descr)
        this.profile.description = this.newDescription
        this.editMode = false
      } catch (e) {
        console.error(e)
      }
    },
    onUpdate (event) {
      this.newDescription = event
    },
    cancelEdit () {
      this.editMode = false
      this.newDescription = this.normalizedDescription
    },
    async follow () {
      if (!this.$store.state.auth.auth) {
        const state = { to: this.$router.currentRoute.path }
        this.$store.dispatch(LOGIN, state)
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
    async getFollowing () {
      try {
        this.showFollowersList = false
        this.followingList = await client.users.following(this.id)
        this.showFollowingList = true
      } catch (e) {
        console.error('falha ao buscar lista de seguindo. erro: ' + e)
      }
    },
    async getFollowers () {
      try {
        this.showFollowingList = false
        this.followingList = await client.users.followers(this.id)
        this.showFollowersList = true
      } catch (e) {
        console.error('falha ao buscar lista de seguidores. erro: ' + e)
      }
    },
    truncate (name) {
      if (name.length <= 25) {
        return name
      }
      return name.substring(0, 22) + '...'
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
.card-padding {
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

.border-color {
  border-color: #DBDAD7
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
