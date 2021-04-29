<template>
  <div>
    <Navbar />
    <LandingPage />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import LandingPage from '@/components/LandingPage'
import Footer from '@/components/Footer'

export default {
  name: 'LandingPageView',

  components: {
    Navbar,
    LandingPage,
    Footer
  }
}
</script>
