<template>
  <div>
    <Navbar />
    <TermsOfService style="min-height: 50rem"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import TermsOfService from '@/components/TermsOfService'
import Footer from '@/components/Footer'

export default {
  name: 'TermsOfServiceView',

  components: {
    Navbar,
    TermsOfService,
    Footer
  }
}
</script>
