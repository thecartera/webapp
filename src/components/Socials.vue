<template>
  <b-container class="l-0 p-0">
    <b-dropdown-item-button>
      <ShareNetwork
        network="whatsapp"
        title="What's App"
        :url="`https://cartera.com.br/#/wallets/${id}/`"
        description="What's App"
      >
        <font-awesome-icon :icon="['fab', 'whatsapp']" class="size whatsapp-color"/>
        Enviar no Whatsapp
      </ShareNetwork>
    </b-dropdown-item-button>

    <b-dropdown-item-button>
      <ShareNetwork
        network="telegram"
        title="💲 Cartera"
        :url="`https://cartera.com.br/#/wallets/${id}/`"
        description="Olha essa carteira 🤑"
      >
        <font-awesome-icon :icon="['fab', 'telegram']" class="size telegram-color"/>
        Enviar no Telegram
      </ShareNetwork>
    </b-dropdown-item-button>

    <b-dropdown-item-button>
      <ShareNetwork
        network="twitter"
        :url="`https://cartera.com.br/#/wallets/${id}/`"
        title="Olha essa carteira! 🤑"
        hashtags="Cartera"
        quote="Essa é minha carteira!"
      >
      <font-awesome-icon :icon="['fab', 'twitter']" class="size twitter-color"/>
      Enviar no Twitter
      </ShareNetwork>
    </b-dropdown-item-button>

    <b-dropdown-item-button>
      <ShareNetwork
        network="facebook"
        :url="`https://cartera.com.br/#/wallets/${id}/`"
        title="this is title"
        description="this is description"
        quote="Olha essa carteira! 🤑"
      >
        <font-awesome-icon :icon="['fab', 'facebook']" class="size fb-color"/>
        Enviar no Facebook
      </ShareNetwork>
    </b-dropdown-item-button>
  </b-container>
</template>

<script>

export default {
  name: 'Socials',

  props: {
    id: {
      type: String,
      required: true
    }
  }

}
</script>

<style scoped>
.size {
  width:  1.3rem;
  height: 1.3rem;
}

.fb-color {
  color: #3B5998;
}

.whatsapp-color {
  color: #25D366;
}

.twitter-color {
  color: #1DA1F2;
}

.telegram-color {
  color: #0088cc;
}
</style>
