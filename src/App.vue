<template>
  <div id="app">
    <Navbar />

    <b-container>
      <b-row>
        <b-col cols="8">
          <User />
          <hr>
          <Wallet />
        </b-col>

        <b-col cols="4">
          <section> Side bar </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import User from './components/User'
import Navbar from './components/Navbar'
import Wallet from './components/Wallet'

export default {
  name: 'App',

  components: { Navbar, User, Wallet }
}
</script>

<style>
</style>
