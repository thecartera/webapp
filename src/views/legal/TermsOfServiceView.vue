<template>
  <div>
    <Navbar />
    <b-row class="m-3" style="width=10rem">
      <b-dropdown
      size="sm"
      id="dropdown-1"
      variant="primary"
      text="Language"
      class="m-2"
      >
        <b-dropdown-item @click="updateLanguage('portuguese')">Português</b-dropdown-item>
        <b-dropdown-item @click="updateLanguage('english')">English</b-dropdown-item>
      </b-dropdown>
    </b-row>
    <TermsOfServicePT v-if="language==='portuguese'" style="overflow-x: hidden"/>
    <TermsOfServiceEN v-if="language==='english'" style="overflow-x: hidden"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import TermsOfServicePT from '@/components/legal/PT_TermsOfService'
import TermsOfServiceEN from '@/components/legal/EN_TermsOfService'
import Footer from '@/components/Footer'

export default {
  name: 'TermsOfServiceView',

  components: {
    Navbar,
    TermsOfServiceEN,
    TermsOfServicePT,
    Footer
  }
}
</script>
