import { Auth0Client } from '@auth0/auth0-spa-js'

// See here for more info on this variable:
//    https://cli.vuejs.org/guide/mode-and-env.html#modes
let clientId = 'wXUXvTKAbog7si5kiaP5Be8Td23XOtRC' // dev
if (process.env.NODE_ENV === 'production') {
  clientId = 'moxpPIgMLGr5LEfOyr3NB0ja4iVsQP1L' // prd
}

const auth0 = new Auth0Client({
  domain: 'monneda.us.auth0.com',
  audience: 'https://api.monneda.com',
  client_id: clientId,
  redirect_uri: `${window.location.origin}/#/callback`,
  cacheLocation: 'localstorage'
})

export default auth0
window.auth0 = auth0
