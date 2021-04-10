import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'
import App from './App.vue'

import './plugins/finance-vue'
import './plugins/bootstrap-vue'
import router from './router'

// Import the Auth0 configuration
import { domain, clientId, audience } from '../auth_config.json'

// Import the plugin here
import { Auth0Plugin } from './auth'

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
