import Vue from 'vue'
import VueGtag from 'vue-gtag'
import router from './../router'

Vue.use(VueGtag, {
  config: { id: 'G-Q9Z4RTC40B' },
  params: {
    send_page_view: false
  }
}, router)
