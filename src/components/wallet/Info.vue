<template>
<b-card>
  <b-card-title>
    <b-row align-h="between">
      <b-col> {{ wallet.name }} </b-col>

      <!-- Share buttons -->
      <b-col class="text-right">
        <b-dropdown right variant="outline-info" no-caret>
          <template #button-content>
            <b-icon variant="info" icon="share-fill" />
          </template>
          <b-dropdown-item-button>
            <vue-goodshare-whats-app has_icon />
            <vue-goodshare-telegram has_icon />
            <vue-goodshare-twitter has_icon />
            <vue-goodshare-facebook has_icon />
          </b-dropdown-item-button>
        </b-dropdown>
      </b-col>
    </b-row>
  </b-card-title>

  <b-card-body>
    <!-- Wallet info -->
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
      <dd> {{ new Date(wallet.createdAt).toLocaleString('pt-BR').split(' ')[0] }} </dd>
    </dl>
  </b-card-body>
</b-card>
</template>

<script>
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook'
import VueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp'
import VueGoodshareTelegram from 'vue-goodshare/src/providers/Telegram'

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
  }
}
</script>
