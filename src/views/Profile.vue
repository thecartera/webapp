<template>
  <div>
    <Navbar />
    <br>
    <Profile :userData="userData"/>
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
  },

  computed: {
    mockUserData () {
      const userData = {
        user: '@novak',
        name: this.$auth.user.name,
        title: 'Head of Capitalz Match',
        description: '📚 Interessado em mercado de capitais \n💰 Capitalz Founder \n🎖 Twitter: GabrielNovak ',
        photoURL: 'https://cdn.discordapp.com/attachments/750789539890462842/823663412906033172/1597514092736.png',
        location: 'Florianópolis, SC'
      }
      return userData
    }
  }
}
</script>
