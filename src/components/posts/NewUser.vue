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
        <b-avatar size="3rem" :src="user_cartera.picture" variant="white" :to="`/users/${user_cartera.username}`"/>
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
          agora
        </b-row>
      </b-col>
      </b-row>
    </b-card-header>

    <b-card-footer class="pt-0 m-0 px-3 pb-0" footer-bg-variant="white">
      <b-row class="px-2 pb-2">
          Bem vindos à <b class="pl-1 text-success"> Cartera </b>!
        <b-card-text class="pt-1">
          🔔 Esse é seu feed, parecido com o do Twitter + Instagram, e com muitas
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
          Telegram. Chame seus amigos e não perca nenhuma oportunidade!
        </b-card-text>
        <b-card-text>
          🤩 Fiquem ligados, teremos muitas novidades em breve!
        </b-card-text>
      </b-row>
    </b-card-footer>
      <b-card-img
        class=""
        src="https://cdn.discordapp.com/attachments/826824589312655427/868240468213891172/Screenshot_from_2021-07-23_18-17-19.png"
        alt="Cartera banner"
      />

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
