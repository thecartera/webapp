<template>
  <b-container class="p-0">
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

              <EditProfile @profileUpdate=fetchProfileById ref="editProfileModal"/>
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
          <b-row style="margin-left: auto" align-v="center">
            Variação
            <b-dropdown
              size="sm"
              id="dropdown-1"
              variant="primary"
              :text="selectedPeriodText"
              class="m-2"
            >
              <b-dropdown-item @click="changeSelectedPeriod(7)">em 7 dias</b-dropdown-item>
              <b-dropdown-item @click="changeSelectedPeriod(30)"> em 30 dias</b-dropdown-item>
              <b-dropdown-item @click="changeSelectedPeriod(90)"> em 90 dias</b-dropdown-item>
              <b-dropdown-item @click="changeSelectedPeriod(getYTD())"> YTD (no ano)</b-dropdown-item>
            </b-dropdown>
          </b-row>
          <b-row v-if="!hasWallets">
            <b-container> Este usuário ainda não criou uma carteira </b-container>
          </b-row>
          <Loading v-if="loadingWallets && hasWallets" style="height:4rem"/>
        </b-col>
      </b-row>
      <b-row v-for="item in wallets" :key="item.id" class="mt-2 ml-2 mr-1">

        <b-col cols="auto" class="pl-2 ml-2 mt-2">
          <b-row align-v="center">
            <PerformanceCircle :pctChange="item.gain"/>
          </b-row>
        </b-col>

        <b-col cols="auto" align-self="end">
          <b-link class="text-primary" :to="`/wallets/${item.id}`">
            {{ item.name }}
          </b-link>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'
import { LOGIN } from '@/store/actions.type'
import EditProfile from '@/components/profile/EditProfile'
import PerformanceCircle from '@/components/utils/PerformanceCircle'
import Loading from '@/components/utils/Loading'

export default {
  name: 'Profile',

  components: {
    EditProfile,
    PerformanceCircle,
    Loading
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
    hasWallets: false,
    showUnfollow: false,
    showFollowingList: false,
    followingList: Array,
    showFollowersList: false,
    followersList: Array,
    modalShow: true,
    selectedPeriod: Number,
    selectedPeriodText: 'YTD (no ano)'
  }),

  computed: {
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
    },
    loadingWallets () {
      if (this.hasWallets) {
        return this.wallets.length === 0
      }
      return false
    }
  },

  methods: {
    async fetchProfileById () {
      client.users.fetchByUsername(this.id).then(i => { this.profile = i })
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
    },
    changeSelectedPeriod (newPeriod) {
      this.selectedPeriod = newPeriod
      this.fetchWallets()
      this.changeSelectedPeriodText(newPeriod)
    },
    changeSelectedPeriodText (newPeriod) {
      let newText = '--'
      switch (newPeriod) {
        case (7):
          newText = `em ${newPeriod} dias`
          break
        case (30):
          newText = `em ${newPeriod} dias`
          break
        case (90):
          newText = `em ${newPeriod} dias`
          break
        default:
          newText = 'no ano'
          break
      }
      this.selectedPeriodText = newText
    },
    async fetchWallets () {
      try {
        this.wallets = []
        const wallets = await client.wallets.fetchByOwner(this.id)
        this.hasWallets = wallets.length > 0
        for (const wall of wallets) {
          client.wallets.fetchById(wall.id, this.selectedPeriod).then(i => this.wallets.push(i))
        }
      } catch {
        console.error('error fetching wallet')
      }
    },
    getYTD () {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const diff = now - start
      const oneDay = 1000 * 60 * 60 * 24
      const day = Math.floor(diff / oneDay)
      return day
    }
  },

  watch: {
    async id () { // watch if opening another user profile
      await this.fetchProfileById()
      await this.fetchWallets()
    }
  },

  async mounted () {
    this.selectedPeriod = this.getYTD()
    await this.fetchProfileById()
    await this.fetchWallets()
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
