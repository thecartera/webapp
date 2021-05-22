import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook)
library.add(faTwitter)
library.add(faTelegram)
library.add(faWhatsapp)
library.add(faShare)
Vue.component('font-awesome-icon', FontAwesomeIcon)
