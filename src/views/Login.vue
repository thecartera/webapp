<template>
  <div>
    <Navbar />
    <br>
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'

export default {
  name: 'LoginView',

  components: {
    Navbar,
    Login
  }
}
</script>
