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
    <PrivacyPolicyPT v-if="language==='portuguese'" style="overflow-x: hidden"/>
    <PrivacyPolicyEN v-if="language==='english'" style="overflow-x: hidden"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import PrivacyPolicyEN from '@/components/legal/EN_PrivacyPolicy'
import PrivacyPolicyPT from '@/components/legal/PT_PrivacyPolicy'
import Footer from '@/components/Footer'

export default {
  name: 'PrivacyPolicyView',

  components: {
    Navbar,
    PrivacyPolicyEN,
    PrivacyPolicyPT,
    Footer
  },

  data: () => ({
    language: 'portuguese'
  }),

  methods: {
    updateLanguage (language) {
      this.language = language
    }
  }
}
</script>
