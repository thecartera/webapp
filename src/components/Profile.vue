<template>
<div class="row justify-content-center">
  <b-card class="userDataCardSize" border-variant="white" align="center">
    <b-row>
      <!-- User image and location -->
      <b-col cols="auto">
        <b-avatar :src="profile.picture" size="6.8rem" />
        <p style="text-align:center">
          <b-icon style="text-align:center" scale="0.8" icon="cursor-fill" variant="info" aria-hidden="true" />
          <span style="font-size:0.65rem;color:gray">
            {{ profile.location }}
          </span>
        </p>
      </b-col>

      <!-- User information -->
      <b-col style="text-align:left" cols="0">
        <span style="font-size:1.1rem">
          <strong> {{ profile.username }} </strong>
          <b-icon icon="patch-check-fill" scale="0.7" variant="info" />
        </span>
        <br>
        <span style="font-size:0.75rem">
          <b> {{ profile.name }} </b>
        </span>
        <b-card class="descriptionCardSize" border-variant="white" no-body align="left">
          <span style="white-space: pre;font-family:Arial;font-size:0.85rem">
            {{ normalizedDescription }}
          </span>
        </b-card>
      </b-col>
    </b-row>

    <!-- Wallet list -->
    <b-row>
      <b-card border-variant="white" align="left">
      <b-card-title> Carteiras: </b-card-title>
      <ul>
        <li v-for="item in normalizedWallets" :key="item.id">
          <b-link class="monneda-blue" :to="`/wallets/${item.id}`">
            {{ item.name }}
          </b-link>
          <b-icon
            icon="x"
            scale="1.3"
            variant="dark"
            v-if="id === user.username"
            @click="deleteWallet(item.id)"
          >
          </b-icon>
        </li>
      </ul>
      </b-card>
    </b-row>
  </b-card>
</div>
</template>

<script>
import client from '@/commons/client.api'

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
    showNonexistentTickerAlert: true
  }),

  computed: {
    normalizedLocation () {
      return this.profile.location === null ? 'Brasil' : this.profile.location
    },
    normalizedDescription () {
      const descr = this.profile.description
      if (descr === undefined || descr === null) { return '' }
      return descr.substring(0, 99)
    },
    normalizedName () {
      const name = this.profile.name
      return name !== undefined ? name.substring(0, 25) : ''
    },
    normalizedUsername () {
      const { username } = this.profile
      return username === undefined ? 'loading' : '@' + username.substring(0, 16)
    },
    normalizedTitle () {
      const title = this.profile.title
      return title !== undefined ? title.substring(0, 15) : ''
    },
    normalizedWallets () {
      return this.wallets.map((w, i) => ({ id: w, name: `Carteira ${i + 1}` }))
    },
    user () {
      return this.$store.state.auth.user
    },
    auth () {
      return this.$store.state.auth.auth
    }
  },

  methods: {
    async fetchProfileById (id) {
      this.profile = await client.users.fetchByUsername(id)
      this.wallets = await client.wallets.fetchByOwner(id)
    },
    async deleteWallet (id) {
      try {
        const index = this.wallets.indexOf(id)
        this.wallets.splice(index, 1)
        await client.wallets.deleteById(id)
      } catch (e) {
        // TODO: alert that it did not work
      }
    }
  },

  watch: {
    id: async function (newVal) { // watch if opening another user profile
      await this.fetchProfileById(newVal)
    }
  },

  async created () {
    await this.fetchProfileById(this.id)
  }
}
</script>

<style scoped>

.descriptionCardSize {
  min-width: 11rem;
  max-width: 11rem;
  min-height: 5rem;
  max-height: 5rem;
  margin: auto;
}

.userDataCardSize {
  min-height: 9.5rem;
  max-height: 9.5rem;
  margin: auto;
}

.monneda-blue {
  color: #0275B1;
}

</style>
