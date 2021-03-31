<template>
  <div>
    <Navbar />
    <br>
    <Register />
  </div>
</template>

<script>
import Register from '@/components/Register'
import Navbar from '@/components/Navbar'

export default {
  name: 'RegisterView',

  components: {
    Navbar,
    Register
  }
}
</script>
