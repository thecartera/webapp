<template>
<b-card no-body style="padding: 1rem 0.7rem 0rem 0.7rem">
  <b-card-title>
    <b-row>
      <!-- title Cartera -->
      <b-col style="line-height: 1.3rem">
        <span class="cartera-title"> Cartera </span>
        <br>
        <b-link class="h6" :to="`/users/${wallet.username}`">
          @{{ wallet.username }}
        </b-link>
      </b-col>
      <!-- Image and location -->
      <b-col>
        <b-row align-h="end">
          <b-col cols="auto">
            <b-avatar
              rounded
              :src="ownerImage"
              size="3.5rem"
              :to="`/users/${wallet.username}`"
              />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card-title>

  <b-card-body style="padding: 0rem 0rem 0rem 0rem">
    <!-- PORTFOLIO NAME AND EDIT BUTTON -->
    <b-row>
      <!-- LEFT COLUMN: Portfolio name -->
      <b-col class="h3">
        {{ wallet.name }}
      </b-col>
      <!-- RIGHT COLUMN: Edit button -->
      <b-col cols="auto">
        <b-row align-h="end" style="margin-right: auto">
          <b-button v-if="wallet.username === user.username" variant="outline-secondary" @click="gotoWalletEditor">
            <b-icon icon="pencil"/>
          </b-button>
        </b-row>
      </b-col>
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
      <b-col class="h5" style="margin-top: 1rem">
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
          <b-row align-h="start" :class="positive(wallet.gain)" style="margin-left: 1.5rem">
            {{ wallet.gain ? wallet.gain.toFixed(2) : 0.0 }}%
            <b-icon v-if="wallet.gain<0" icon="arrow-down"/>
            <b-icon v-else icon="arrow-up"/>
          </b-row>
        </dl>
      </b-col>

      <!-- Share buttons -->
      <b-col align-self="end" cols="auto">
        <b-row style="margin-bottom: 2rem; margin-right: auto">
          <b-dropdown right variant="outline-info" no-caret>
            <template #button-content>
              Compartilhar
              <!-- <b-icon variant="info" icon="share-fill" /> -->
            </template>
            <b-dropdown-item-button>
              <vue-goodshare-whats-app has_icon />
              <vue-goodshare-telegram has_icon />
              <vue-goodshare-twitter has_icon />
              <vue-goodshare-facebook has_icon />
            </b-dropdown-item-button>
          </b-dropdown>
        </b-row>
      </b-col>

    </b-row>
  </b-card-body>
</b-card>
</template>

<script>
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook'
import VueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp'
import VueGoodshareTelegram from 'vue-goodshare/src/providers/Telegram'

import client from '@/commons/client.api'

export default {
  name: 'WalletInfo',

  components: {
    VueGoodshareTwitter,
    VueGoodshareFacebook,
    VueGoodshareWhatsApp,
    VueGoodshareTelegram
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
  font-size: 2rem;
  color: #33d260;
  font-weight: bold;
}
</style>
