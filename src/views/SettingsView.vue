<template>
  <div>
    <Navbar />

    <ThreeColumnsLayout>
      <b-dropdown size="sm" id="dropdown-1" variant="primary" text="Language" class="m-2">
        <b-dropdown-item @click="updateLanguage('portuguese')"> Português </b-dropdown-item>
        <b-dropdown-item @click="updateLanguage('english')"> English </b-dropdown-item>
      </b-dropdown>

      <b-tabs>
        <b-tab title="Política de privacidade" v-if="language==='portuguese'">
          <PrivacyPolicyPT/>
        </b-tab>
        <b-tab title="Termos de uso" v-if="language==='portuguese'">
          <TermsOfServicePT/>
        </b-tab>
        <b-tab title="Privacy policy" v-if="language==='english'">
          <PrivacyPolicyEN/>
        </b-tab>
        <b-tab title="Terms of use" v-if="language==='english'">
          <TermsOfServiceEN/>
        </b-tab>
      </b-tabs>
    </ThreeColumnsLayout>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import PrivacyPolicyEN from '@/components/legal/EN_PrivacyPolicy'
import PrivacyPolicyPT from '@/components/legal/PT_PrivacyPolicy'
import TermsOfServiceEN from '@/components/legal/EN_TermsOfService'
import TermsOfServicePT from '@/components/legal/PT_TermsOfService'
import Footer from '@/components/Footer'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'SettingsView',

  components: {
    Navbar,
    PrivacyPolicyEN,
    PrivacyPolicyPT,
    TermsOfServiceEN,
    TermsOfServicePT,
    Footer,
    ThreeColumnsLayout
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
