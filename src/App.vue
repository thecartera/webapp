<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <Wallet name="Minha carteira" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Wallet from '@/components/Wallet'

export default {
  name: 'App',
  components: { Wallet }
}
</script>
