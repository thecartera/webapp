<template>
  <div class="cartera-background-color">
    <Navbar />
    <Profile :id="id" style="min-height: 35rem"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'

export default {
  name: 'ProfileView',

  components: {
    Navbar,
    Profile
  },

  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
