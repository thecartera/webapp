<template>
<b-card>
  <b-card-title>
    <b-row>
      <!-- LEFT COLUMN -->
      <b-col class="h3">
        {{ wallet.name }}
      </b-col>

      <!-- RIGHT COLUMN -->
      <!-- Edit button -->
      <b-col>
        <b-row align-h="end" style="margin-right: 1rem">
          <b-button v-if="wallet.username === user.username" variant="outline-secondary" @click="gotoWalletEditor">
            Editar
            <b-icon icon="pencil"/>
          </b-button>
        </b-row>
      </b-col>

    </b-row>
  </b-card-title>

  <b-card-body style="padding: 0rem 0rem 0rem 0rem">
    <b-row>

    <!-- Wallet info -->
      <b-col class="h5">
        <dl>
          <!-- Image and location -->
          <b-row align-h="start">
            <b-col cols="auto">
              <b-avatar :src="ownerImage" size="3rem" />
            </b-col>
            <b-col cols="ce" align-self="center">
              <b-link :to="`/users/${wallet.username}`">
                @{{ wallet.username }}
              </b-link>
            </b-col>
          </b-row>

          <br>
          <dt> Retorno (30d)
            <b-icon icon="question-circle-fill"
              scale="0.7"
              variant="secondary"
              shift-h="-6"
              shift-v="6"
              v-b-tooltip.hover title="Em relação aos preços de fechamento de ontem e 30 dias antes"/>
          </dt>
          <dd :class="positive(wallet.gain)">
            {{ wallet.gain ? wallet.gain.toFixed(2) : 0.0 }}%
            <b-icon v-if="wallet.gain<0" icon="arrow-down"/>
            <b-icon v-else icon="arrow-up"/>
          </dd>
        </dl>
      </b-col>

      <!-- Share buttons -->
      <b-col align-self="end">
        <b-row align-h="end" style="margin-bottom: 2rem; margin-right: 1rem">
          <b-dropdown right variant="outline-info" no-caret>
            <template #button-content>
              Compartilhar
              <b-icon variant="info" icon="share-fill" />
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
</style>
