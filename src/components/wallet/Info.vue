<template>
<b-card no-body :title="wallet.name">
  <b-card-body title="Sua carteira">
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
        <vue-goodshare-twitter has_icon/>
        <vue-goodshare-facebook has_icon />
      </b-col>
    </b-row>
  </b-card-body>
</b-card>
</template>

<script>
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook'

export default {
  name: 'WalletInfo',

  components: {
    VueGoodshareTwitter,
    VueGoodshareFacebook
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
