<template>
  <b-card no-body>
    <b-card-header class="pt-1 pb-1 m-0">
      <b-row>
        <b-col cols="auto" class="pl-0 pr-0">
          <b-avatar
            rounded
            :src="ownerImage"
            size="md"
            :to="`/users/${wallet.username}`"
          />
        </b-col>
        <b-col class="pl-3" style="line-height:1.35rem">
          <b-row>
            <b-link style="color: gray" class="pl-1" :to="`/users/${wallet.username}`">
              {{ wallet.username }}
            </b-link>
          </b-row>
          <b-row>
            <!-- title Cartera -->
            <span class="cartera-title pl-1"> Cartera </span>
          </b-row>
        </b-col>
        <b-col>
          <b-row align-h="end" class="pt-1 pr-1">
            <b-dropdown no-caret right variant="outline-light">
              <template #button-content>
                <b-icon
                  icon="three-dots-vertical"
                  scale="1"
                  style="cursor: pointer"
                  variant="dark"
                />
              </template>
              <b-dropdown-item-button
                style="width:15rem"
                v-if="wallet.username === user.username"
                @click="gotoWalletEditor"
              >
                <b-icon
                  scale="1"
                  icon="pencil-square"
                  variant="secondary"
                  style="cursor: pointer"
                /> Editar carteira
              </b-dropdown-item-button>

              <!-- Delete Portfolio -->
              <b-dropdown-item-button
                v-if="wallet.username === user.username"
                v-b-modal.modal-1>
                <b-icon
                  icon="trash"
                  variant="secondary"
                /> Excluir carteira
                <b-modal
                  id="modal-1"
                  title="Excluir carteira?"
                  ok-title="Excluir"
                  ok-variant="danger"
                  @ok="deleteWallet"
                >
                <span class="text-danger"> ATENÇÃO: </span>
                <span> Esta ação é irreversível </span>
                </b-modal>
              </b-dropdown-item-button>

              <!-- SHARE BUTTONS -->
              <Socials v-if="wallet.id" :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"/>
            </b-dropdown>
          </b-row>
        </b-col>
      </b-row>
    </b-card-header>

    <b-card-body class="pl-2 pt-2 pb-0">
      <!-- PORTFOLIO NAME AND EDIT BUTTON -->
      <b-row>
        <!-- LEFT COLUMN: Portfolio name -->
        <b-col>
          <h4>
          {{ wallet.name }}
          </h4>
        </b-col>
        <!-- RIGHT COLUMN: Edit button -->
      </b-row>

      <!-- DESCRIPTION -->
      <b-row v-if="wallet.description" style="white-space: pre-wrap; padding: 0rem 0rem 0rem 0.5rem">
        <span
        class="portfolio-description"
        style="font-size: 0.9rem">{{ wallet.description }}
        </span>
      </b-row>

      <b-row>
      <!-- Wallet info -->
        <b-col class="h6" style="margin-top: 1rem">
          <dl>
            <b-row style="margin-left: auto"> Retorno (30d)
              <b-icon icon="question-circle-fill"
                scale="0.7"
                variant="secondary"
                shift-h="-4"
                shift-v="5"
                id="return-tooltip"
              >
              </b-icon>
              <b-tooltip
              target="return-tooltip"
              triggers="click"
              placement="topright">
                Em relação aos preços de fechamento de ontem e 30 dias antes
              </b-tooltip>
            </b-row>
            <b-row class="mt-1 ml-2" align-v="center">
                <b-iconstack shift-v="1">
                  <b-icon scale="1.2" stacked icon="circle" :variant="wallet.gain < 0? 'danger' : 'success'"/>
                  <b-icon v-if="wallet.gain < 0" stacked icon="arrow-down" variant="danger"/>
                  <b-icon v-else stacked icon="arrow-up" variant="success"/>
                </b-iconstack>
                <span class="pl-2 mr-2" style="font-size: 1rem">
                  {{ wallet.gain ? wallet.gain.toFixed(2) : 0.0 }}%
                </span>
            </b-row>
          </dl>
        </b-col>

        <!-- Share buttons -->
        <b-col align-self="center" cols="auto" class="pr-4">
          <b-row>
            <b-dropdown right no-caret variant="white">
              <template #button-content>
                <font-awesome-icon
                  :icon="['fas', 'share']"
                  style="color: black; width: 1.5rem; height: 1.5rem"
                />
              </template>
              <Socials v-if="wallet.id" :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"/>
            </b-dropdown>
          </b-row>
        </b-col>
      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'
import Socials from '@/components/Socials'

export default {
  name: 'WalletInfo',

  components: {
    Socials
  },

  props: {
    wallet: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    ownerImage: ''
  }),

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    gotoWalletEditor () {
      this.$router.push(`/wallets/${this.wallet.id}/edit`)
    },
    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },
    async getOwnerImage () {
      const owner = await client.users.fetchByUsername(this.wallet.username)
      this.ownerImage = owner.picture
    },
    async deleteWallet () {
      try {
        await client.wallets.deleteById(this.wallet.id)
        this.$router.push(`/users/${this.user.username}`)
      } catch (e) {
        // TODO: alert that it did not work
        console.error(e)
      }
    }
  },

  watch: {
    async wallet () { // watch if opening another user profile
      await this.getOwnerImage()
    }
  }
}
</script>

<style scoped>
.infoo {
  font-size: 1.5rem;
}

.portfolio-description {
  padding-left: 0.5rem;
  font-size: 0.9rem
}

.cartera-title {
  font-family: 'Helvetica';
  font-size: 1rem;
  color: #33d260;
  font-weight: bold;
}
</style>
