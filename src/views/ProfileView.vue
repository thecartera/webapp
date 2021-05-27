<template>
  <div>
    <Navbar />
    <Profile :id="id" style="overflow-x: hidden"/>
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
