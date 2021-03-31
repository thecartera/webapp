<template>
  <div>
    <Navbar />
    <br>
    <Profile />
  </div>
</template>

<script>
import Profile from '@/components/UserAndDescription'
import Navbar from '@/components/Navbar'

export default {
  name: 'ProfileView',

  components: {
    Navbar,
    Profile
  }
}
</script>
