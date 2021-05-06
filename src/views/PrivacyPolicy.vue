<template>
  <div>
    <Navbar />
    <PrivacyPolicy style="min-height: 50rem"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import Footer from '@/components/Footer'

export default {
  name: 'PrivacyPolicyView',

  components: {
    Navbar,
    PrivacyPolicy,
    Footer
  }
}
</script>
