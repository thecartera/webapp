import { Auth0Client } from '@auth0/auth0-spa-js'

export default new Auth0Client({
  domain: 'monneda.us.auth0.com',
  audience: 'https://api.monneda.com',
  client_id: 'moxpPIgMLGr5LEfOyr3NB0ja4iVsQP1L',
  redirect_uri: `${window.location.origin}/#/callback`
})
