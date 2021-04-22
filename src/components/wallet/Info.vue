<template>
<b-card title="Carteira" no-body>
  <b-row>
    <b-col>
      <b-card-body :title="wallet.name">
        <b-row>
          <!-- Wallet info -->
          <b-col>
            <dl>
              <dt> Criador: </dt>
              <dd>
                <b-link :to="`/users/${wallet.username}`">
                  @{{ wallet.username }}
                </b-link>
              </dd>

              <dt> Retorno (30d): </dt>
              <dd> {{ wallet.gain ? wallet.gain.toFixed(2) : 0.0 }}% </dd>

              <dt> Criada em: </dt>
              <dd> {{ wallet.createdAt }} </dd>
            </dl>
          </b-col>

        </b-row>
      </b-card-body>
    </b-col>
    <b-col cols="3" style="padding: 1rem 0rem 0rem 0rem">
      <b-dropdown right variant="info" no-caret size="sm">
        <template #button-content>
          <b-icon variant="white" icon="share-fill"></b-icon>
        </template>
        <!-- Share buttons -->
        <b-dropdown-item-button>
          <vue-goodshare-whats-app has_icon />
          <vue-goodshare-telegram has_icon />
          <vue-goodshare-twitter has_icon />
          <vue-goodshare-facebook has_icon />
          <!-- <vue-goodshare-linked-in has_icon /> -->
        </b-dropdown-item-button>
      </b-dropdown>
    </b-col>
  </b-row>
</b-card>
</template>

<script>
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook'
// import VueGoodshareLinkedIn from 'vue-goodshare/src/providers/LinkedIn'
import VueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp'
import VueGoodshareTelegram from 'vue-goodshare/src/providers/Telegram'

export default {
  name: 'WalletInfo',

  components: {
    VueGoodshareTwitter,
    VueGoodshareFacebook,
    // VueGoodshareLinkedIn,
    VueGoodshareWhatsApp,
    VueGoodshareTelegram
  },

  props: {
    wallet: {
      type: Object
    }
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>
