<template>
  <div style="background-color: #F3F2EF">
    <Navbar />
    <Profile :id="id" />
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
