<template>
  <b-container>
    <!-- User -->
    <b-card class="p-2 border-color" no-body>
      <b-row>
        <!-- Image -->
        <b-col cols="auto">
          <b-avatar :src="profile.picture" size="5rem" />
        </b-col>

        <!-- User information -->
        <b-col class="pl-2">
          <b-row style="line-height: 1.5rem">
            <!-- Username -->
            <b-col cols="9" align-self="center">
              <b-row>
                <strong style="font-size:1.1rem"> {{ normProfile.username }} </strong>
              </b-row>
            </b-col>

            <!-- Edit profile -->
            <b-col cols="3" class="pt-1 pr-2">
              <!-- Edit profile off -->
              <b-row align-h="end" class="pr-4"
                v-if="id === user.username"
              >

              <b-icon @click="showModal" style="cursor: pointer" scale="1.4" icon="pencil-square" variant="secondary"/>

              <EditProfile @profileUpdate=fetchProfileById(user.username) ref="editProfileModal"/>
              </b-row>
            </b-col>
          </b-row>

          <!-- Title -->
          <b-row style="line-height: 1.1rem" class="mr-0" align-v="start">
            <b-col>
              <b-row>
                <span style="font-size:0.9rem; color: gray"> {{ normProfile.title }} </span>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="mt-2" style="line-height: 0.9rem; text-align: center">
            <!-- Followers/Follows -->
            <b-col cols="auto" class="pl-0 ml-2 pr-0 mr-0">
              <b-row align-h="start">

                <!-- Followers count -->
                <b-col class="follow-list-clickable pl-0 ml-2 mr-0 pr-0" @click="gotoFollowers(id)">
                  <span id="followers-list" style="font-size: 0.9rem">
                    {{ followersCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.75rem; color: grey"> seguidores </span>
                </b-col>

                <!-- Following count -->
                <b-col class="follow-list-clickable pl-0 ml-2 mr-0 pr-0" @click="gotoFollowing(id)">
                  <span id="following-list" style="font-size: 0.9rem">
                    {{ normProfile.followingCount }}
                  </span>
                  <br>
                  <span style="font-size: 0.75rem; color: grey"> seguindo </span>
                </b-col>

              </b-row>
            </b-col>

            <!-- (Un)follow Buttons-->
            <b-col class="pl-0 mr-0 pr-0 mr-2" v-if="id !== user.username">
              <!-- Unfollow -->
              <b-button
                size="sm"
                id="unfollow-confirmation"
                v-if="normProfile.following"
                @click="unfollow"
                variant="outline-secondary"
                style="font-size: 0.8rem"
              >
                Seguindo
              </b-button>
              <!-- Follow -->
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
      <b-row class="mt-2">
        <b-col align-self="end">
          <strong style="font-size: 1em">
            {{ normProfile.name }}
          </strong>
        </b-col>
      </b-row>

      <!-- Description -->
      <b-row>
        <b-col style="line-height: 1.4rem">
          <span style="font-size: 1rem; white-space: pre-wrap">{{ normProfile.description }}</span>
        </b-col>
      </b-row>
    </b-card>

    <!-- Wallets -->
    <b-card style="border-color: #DBDAD7" class="mt-2 p-2" no-body>
      <b-row>
        <b-col>
        <h3> Carteiras </h3>
        </b-col>
      </b-row>
      <b-row v-for="item in normalizedWallets" :key="item.id" class="mt-2 ml-2 mr-1">

        <b-col cols="auto" class="pl-2 ml-2 mt-2">
          <b-row style="width: 6rem" align-v="center">
              <b-iconstack shift-v="3">
                <b-icon scale="1.8" stacked icon="circle" :variant="item.gain < 0? 'danger' : 'success'"/>
                <b-icon v-if="item.gain < 0" stacked icon="arrow-down" variant="danger"/>
                <b-icon v-else stacked icon="arrow-up" variant="success"/>
              </b-iconstack>
              <span class="pl-3 mr-2" style="font-size: 1rem">
                {{ item.gain.toFixed(2) }}%
              </span>
          </b-row>
        </b-col>

        <b-col cols="auto" align-self="end">
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
        </b-col>
      </b-row>

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
    normalizedWallets () {
      return this.wallets.map((w, i) => ({ id: w.id, name: w.name, gain: w.gain }))
    },
    user () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    },
    followersCount () {
      return this.normProfile.followersCount
    },
    normalizedFollowingList () {
      return this.followingList
    },
    normalizedFollowersList () {
      return this.followersList
    },
    normProfile () {
      return this.profile
    }
  },

  methods: {
    async fetchProfileById (id) {
      this.wallets = []
      this.profile = await client.users.fetchByUsername(id)
      const wallets = await client.wallets.fetchByOwner(id)
      for (let ii = 0; ii < wallets.length; ii++) {
        const temp = await client.wallets.fetchById(wallets[ii].id)
        this.wallets.push(temp)
      }
    },
    async deleteWallet () {
      try {
        await client.wallets.deleteById(this.selected.id)
        const index = this.wallets.map(i => i.id).indexOf(this.selected.id)
        if (index > -1) {
          this.wallets.splice(index, 1)
        }
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

</style>
