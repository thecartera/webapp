<template>
  <div>
    <Navbar />
    <LandingPage style="overflow-x: hidden"/>
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
