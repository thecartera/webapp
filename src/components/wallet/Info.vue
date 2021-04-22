<template>
<b-card title="Carteira">
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
          <dd> {{ wallet.gain.toFixed(2) }}% </dd>

          <dt> Criada em: </dt>
          <dd> {{ wallet.createdAt }} </dd>
        </dl>
      </b-col>

      <!-- Share buttons -->
      <b-col align-self="end" class="text-right">
        <vue-goodshare-twitter has_icon />
        <vue-goodshare-facebook has_icon />
        <vue-goodshare-linked-in has_icon />
      </b-col>
    </b-row>
  </b-card-body>
</b-card>
</template>

<script>
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook'
import VueGoodshareLinkedIn from 'vue-goodshare/src/providers/LinkedIn'

export default {
  name: 'WalletInfo',

  components: {
    VueGoodshareTwitter,
    VueGoodshareFacebook,
    VueGoodshareLinkedIn
  },

  props: {
    wallet: {
      type: Object,
      default: () => ({
        gain: 0.0
      })
    }
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>
