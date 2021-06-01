import { Auth0Client } from '@auth0/auth0-spa-js'

// See here for more info on this variable:
//    https://cli.vuejs.org/guide/mode-and-env.html#modes
let clientId = 'LMFDlOJhgdnFEvXK45rcd3M489fXnYFU' // dev
if (process.env.NODE_ENV === 'production') {
  clientId = 'rD7cai4xl9436V3RPJvGC7lQpe6HQQfR' // prd
}

const auth0 = new Auth0Client({
  domain: 'cartera.us.auth0.com',
  audience: 'https://api.cartera.com',
  client_id: clientId,
  redirect_uri: `${window.location.origin}/#/callback`,
  cacheLocation: 'localstorage'
})

export default auth0
window.auth0 = auth0
