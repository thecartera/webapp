// Polyfills
import '@babel/polyfill'
import 'mutationobserver-shim'

// Vue
import Vue from 'vue'

// Plugins
import './plugins/bootstrap'
import 'chartjs-plugin-colorschemes'

// MeiliSearch
import InstantSearch from 'vue-instantsearch'

// App itself
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(InstantSearch);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
