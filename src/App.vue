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
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
