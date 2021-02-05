<template>
  <div id="app">
    <b-navbar variant="info">
      <b-navbar-brand href="#"> Monneda </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item href="#"> Feed </b-nav-item>
        <b-nav-item href="#"> Rede </b-nav-item>
        <b-nav-item href="#"> Eventos </b-nav-item>
        <b-nav-item href="#"> Chat </b-nav-item>
        <b-nav-item href="#"> Notificações </b-nav-item>
        <b-nav-item href="#"> Hashtags </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" placeholder="Pesquisa"></b-form-input>
          <b-button size="sm"> Search </b-button>
        </b-nav-form>
        <b-nav-item href="#"> Perfil </b-nav-item>
        <b-nav-item href="#"> Carteiras </b-nav-item>
        <b-nav-item href="#"> Opções </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col cols="8">
          <b-card title="Nova publicação">
            <b-form-textarea></b-form-textarea>
            <b-button> Post </b-button>
          </b-card>

          <hr>

          <b-card title="Tiago Nigro" sub-title="O primo rico">
            <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
            <b-card-text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </b-card-text>

            <b-card-footer>
              <b-row>
                <b-col cols="1">
                  <b-icon icon="hand-thumbs-up" />
                </b-col>
                <b-col cols="1">
                  <b-icon icon="chat" />
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>

        </b-col>

        <b-col cols="4">
          <section> Side bar </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
