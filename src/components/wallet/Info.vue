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
                @click="gotoWalletEditor">
                <b-icon
                  scale="1"
                  icon="pencil-square"
                  variant="secondary"
                  style="cursor: pointer"
                /> Editar carteira
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="whatsapp"
                  title="What's App"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  description="What's App"
                > Enviar no Whatsapp
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="telegram"
                  title="💲 Cartera"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  description="Olha essa carteira 🤑"
                > Enviar no Telegram
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="twitter"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  title="Olha essa carteira! 🤑"
                  hashtags="Cartera"
                  quote="Essa é minha carteira!"
                > Enviar no Twitter
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="facebook"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  title="this is title"
                  description="this is description"
                  quote="Olha essa carteira! 🤑"
                > Enviar no Facebook
                </ShareNetwork>
              </b-dropdown-item-button>
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
      <b-row style="white-space: pre-wrap; padding: 0rem 0rem 0rem 0.5rem">
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
        <b-col align-self="end" cols="auto">
          <b-row style="margin-bottom: 2rem; margin-right: auto">
            <b-dropdown right variant="outline-light" no-caret>
              <template #button-content>
                <b-img class="mt-3" width="24rem" height="24rem" src="../../assets/share.svg"/>
                <!-- <b-icon variant="info" icon="share-fill" /> -->
              </template>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="whatsapp"
                  title="What's App"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  description="What's App"
                > Enviar no Whatsapp
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="telegram"
                  title="💲 Cartera"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  description="Olha essa carteira 🤑"
                > Enviar no Telegram
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="twitter"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  title="Olha essa carteira! 🤑"
                  hashtags="Cartera"
                  quote="Essa é minha carteira!"
                > Enviar no Twitter
                </ShareNetwork>
              </b-dropdown-item-button>
              <b-dropdown-item-button>
                <ShareNetwork
                  class="pl-2"
                  network="facebook"
                  :url="`https://cartera.com.br/#/wallets/${wallet.id}/`"
                  title="this is title"
                  description="this is description"
                  quote="Olha essa carteira! 🤑"
                > Enviar no Facebook
                </ShareNetwork>
              </b-dropdown-item-button>
            </b-dropdown>
          </b-row>
        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'WalletInfo',

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
