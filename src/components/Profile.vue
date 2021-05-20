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
                <strong> {{ profile.username }} </strong>
              </b-row>
            </b-col>

            <!-- Edit profile -->
            <b-col cols="3">
              <!-- Edit profile off -->
              <b-row
                v-if="id === user.username && !editMode"
                align-h="center"
              >
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="editMode = true"
                >
                  <b-icon icon="pencil-fill" />
                </b-button>
              </b-row>
            </b-col>
          </b-row>

          <b-row style="line-height: 0.8rem; text-align: center; margin-top: 0.5rem">
            <!-- Followers/Follows -->
            <b-col cols="auto">
              <b-row align-h="center">
                <!-- Followers count -->
                <b-col cols="auto" class="follow-list-clickable" @click="gotoFollowers(id)">
                  <span id="followers-list" style="font-size: 0.8rem">
                    {{ followersCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.65rem; color: grey"> seguidores </span>
                </b-col>

                <b-col/>

                <!-- Following count -->
                <b-col cols="auto" class="follow-list-clickable" @click="gotoFollowing(id)">
                  <span id="following-list" style="font-size: 0.8rem">
                    {{ profile.followingCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.65rem; color: grey"> seguindo </span>
                </b-col>
              </b-row>
            </b-col>

            <!-- Unfollow Button-->
            <b-col>
              <b-row>
                <b-col v-if="id !== user.username">
                  <!-- Unfollow -->
                  <b-button
                    size="sm"
                    id="unfollow-confirmation"
                    v-if="profile.following"
                    @click="unfollow"
                    variant="outline-secondary"
                  >
                    <b-icon icon="person-check-fill" variant="dark"/>
                  </b-button>
                </b-col>
              </b-row>
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
      <b-row style="white-space: pre-wrap; padding-left: 0.5rem">
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

      <!-- Follow -->
      <b-row style="padding-left: 1rem; padding-right: 1rem">
        <b-button
        style="height:1.2rem; line-height: 0rem"
          block
          size="sm"
          variant="success"
          v-if="id !== user.username && !profile.following"
          @click="follow">
          <b> Seguir </b>
        </b-button>
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
