import { Auth0Client } from '@auth0/auth0-spa-js'

const auth0 = new Auth0Client({
  domain: 'monneda.us.auth0.com',
  audience: 'https://api.monneda.com',
  client_id: 'moxpPIgMLGr5LEfOyr3NB0ja4iVsQP1L',
  redirect_uri: `${window.location.origin}/#/callback`,
  cacheLocation: 'localstorage'
})

export default auth0
window.auth0 = auth0
