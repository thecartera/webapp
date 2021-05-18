// Vue
import Vue from 'vue'

// Plugins
import './plugins/meili'
import './plugins/bootstrap'
import 'chartjs-plugin-colorschemes'
import '@/assets/css/main.css'

// App
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
