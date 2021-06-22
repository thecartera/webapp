<template>
  <b-container class="px-0">
    <b-card
    title="Bem vindos!"
    tag="article"
    no-body
    >

    <b-card-header class="pt-1 pb-0 px-4">
      <!-- User -->
      <b-row class="p-0" >

      <!-- Picture -->
      <b-col cols="auto" class="p-0">
        <b-avatar size="3rem" :src="user_cartera.picture" :to="`/users/${user_cartera.username}`"/>
      </b-col>

      <b-col style="line-height: 1.1rem" class="pl-4">
        <!-- Username -->
        <b-row>
          <b-link :to="`/users/${user_cartera.username}`" class="text-dark text-decoration-none">
            <strong class="text-truncate"> {{ user_cartera.username }} </strong>
          </b-link>
        </b-row>

        <!-- Title -->
        <b-row>
          <span v-if="user_cartera.title" class="text-secondary" style="font-size: 0.85rem">
          {{ user_cartera.title }}
          </span>
        </b-row>

        <!-- Timestamp -->
        <b-row class="text-secondary text-truncate" style="font-size: 0.75rem">
          02/06/2021 18:32
        </b-row>
      </b-col>
      </b-row>
    </b-card-header>

    <b-card-img
      src="https://cdn.discordapp.com/attachments/826824589312655427/849768240829169694/3.png"
      alt="Cartera banner"
    />

    <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
      <b-row align-v="center">
        <!-- Like -->
        <b-button class="pb-0" v-if="this.likeCount === 31" @click="likeCount = 32" variant="white" size="sm">
          <font-awesome-icon style="height: 1.3rem; width: 1.3rem" :icon="['far', 'thumbs-up']"/>
          <span class="h6"> {{ likeCount }} </span>
        </b-button>
        <!-- Unlike -->
        <b-button class="pb-0" v-else @click="likeCount = 31" variant="white" size="sm">
          <font-awesome-icon style="height: 1.3rem; width: 1.3rem" :icon="['fas', 'thumbs-up']" class="text-primary" />
          <span class="h6"> {{ likeCount }} </span>
        </b-button>

      </b-row>

      <b-row class="px-2 pb-2">
        <b-link :to="`/users/${user_cartera.username}`" class="text-dark pr-2">
          <strong> {{ user_cartera.username }} </strong>
        </b-link>
          Bem vindos à <b class="pl-1 text-success"> Cartera </b>!
        <b-card-text class="pt-1">
          🔔 Esse é seu feed, parecido com o do Twitter + Instagram, só que com
          funções específicas para investidores! Por exemplo, é aqui que você vai
          ficar sabendo de atualizações das carteiras dos seus amigos.
        </b-card-text>
        <b-card-text>
          ⚡️ Comece seguindo outros usuários, vendo uma
          <b-link to="/wallets/6073e39242cb2b06e78c1cb1">
            carteira
          </b-link>
          ou
          <b-link to="/wallets"> criando a sua própria. </b-link>
          Ah, e você pode compartilhar qualquer carteira no WhatsApp, Twitter e
          Telegram.
        </b-card-text>
        <b-card-text>
          🤩 Fiquem ligados, teremos muitas novidades em breve!
        </b-card-text>
      </b-row>
    </b-card-footer>

    <b-button @click="start" variant="primary">Começar!</b-button>
    </b-card>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'

export default {

  data: () => ({
    user_cartera: {},
    likeCount: 31
  }),

  methods: {
    async start () {
      await client.users.follow('cartera')
      await client.users.follow('bueno')
      await client.users.follow('mauricio')
      this.$emit('updateFeed')
    }
  },

  async created () {
    this.user_cartera = await client.users.fetchByUsername('cartera')
  }
}
</script>
