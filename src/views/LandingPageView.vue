<template>
  <div>
    <Navbar />
    <LandingPage />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import LandingPage from '@/components/LandingPage'

export default {
  name: 'LandingPageView',

  components: {
    Navbar,
    LandingPage
  }
}
</script>
