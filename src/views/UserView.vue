<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <User />
        <hr>
        <Wallets />
      </b-col>

      <b-col cols="4">
        <section> Side bar </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import User from '../components/User'
import Wallets from '../components/Wallets'

export default {
  name: 'UserView',
  components: { User, Wallets }
}
</script>
