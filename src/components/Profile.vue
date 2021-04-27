<template>

<b-container>
  <!-- User -->
  <b-card align="center" style="border-color: #DBDAD7; margin-top: 1rem">
    <b-row>
      <!-- Image and location -->
      <b-col>
        <b-avatar :src="profile.picture" size="6.8rem" />
        <br>
        <small class="text-secondary">
          <b-icon icon="cursor-fill" variant="info" aria-hidden="true" />
          {{ profile.location }}
        </small>
      </b-col>

      <!-- User information -->
      <b-col class="text-left">
        <!-- Username -->
        <span>
          <strong> @{{ profile.username }} </strong>
          <b-icon icon="patch-check-fill" variant="info" />
        </span>

        <br>

        <!-- Name -->
        <small>
          <strong> {{ profile.name }} </strong>
        </small>

        <br>

        <!-- Description -->
        {{ normalizedDescription }}
      </b-col>
    </b-row>
  </b-card>

  <!-- Wallets -->
  <b-card style="border-color: #DBDAD7; margin-top: 1rem" title="Carteiras">
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
    selected: {}
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
      return this.wallets.map((w, i) => ({ id: w.id, name: w.name }))
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
