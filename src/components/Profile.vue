<template>
  <b-container id="screenSize">
    <!-- User -->
    <b-card align="center" style="border-color: #DBDAD7; margin-top: 1rem">
      <b-row>
        <!-- Image and location -->
        <b-col cols="auto">
          <b-avatar rounded :src="profile.picture" size="5rem" />
          <br>
          <small class="text-secondary">
            <b-icon icon="cursor-fill" class="cartera-blue-color" aria-hidden="true" />
            {{ normalizedLocation }}
          </small>
        </b-col>

        <!-- User information -->
        <b-col class="text-left">
          <b-row>
            <!-- Username -->
            <b-col style="padding: 0rem 0rem 0rem 0.8rem" align-self="center">
              <b-row>
                <strong> @{{ profile.username }} </strong>
                <!-- <b-icon icon="patch-check-fill" class="cartera-blue-color" /> -->
                </b-row>
              <b-row>
                <span style="font-size: 0.9rem; font-weight: 600"> {{ profile.name }} </span>
              </b-row>
            </b-col>

            <!-- Edit profile -->
            <b-col>
              <!-- Edit profile off -->
              <b-row v-if="id === user.username && !editMode"
                align-h="end"
                style="margin-right: 0">
                <b-button size="sm" variant="outline-secondary" @click="editMode = true">
                  <b-icon icon="pencil-fill"/>
                </b-button>
              </b-row>
            </b-col>
          </b-row>

          <!-- Edit profile on -->
          <b-row v-if="id === user.username && editMode" align-h="around">
              <b-button
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

          <!-- Description -->
          <b-row style="white-space: pre-wrap; margin-top: 0.5rem">
            <b-container
              v-if="!editMode"
              style="padding: 0rem 0rem 0rem 0rem; font-size: 0.9rem">{{ normalizedDescription }}
            </b-container>
            <b-container v-else style="padding: 0rem 0rem 0rem 0rem" >
              <b-form-textarea
                :value="normalizedDescription"
                @update="onUpdate"
                placeholder="Adicione uma descrição"
                no-resize
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-container>
          </b-row>
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
    selected: {},
    editMode: false,
    newDescription: ''
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
    }
  },

  methods: {
    async fetchProfileById (id) {
      this.profile = await client.users.fetchByUsername(id)
      this.newDescription = this.profile.description.substring(0, 140)
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
        const res = await client.users.updateMyUser(descr)
        this.profile.description = this.newDescription
        console.log(res)
        this.editMode = false
      } catch (e) {
        console.error(e)
      }
    },
    onUpdate (event) {
      console.log(event)
      this.newDescription = event
    },
    cancelEdit () {
      this.editMode = false
      this.newDescription = this.normalizedDescription
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
