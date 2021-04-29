import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'

import meili from '@/commons/meili.api'

Vue.use(InstantSearch)

const plugin = {
  install (Vue, meili) {
    Vue.prototype.$meili = meili
  }
}

Vue.use(plugin, meili)
