import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'
import App from './App.vue'

import './plugins/finance-vue'
import './plugins/bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
