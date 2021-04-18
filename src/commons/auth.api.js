import { Auth0Client } from '@auth0/auth0-spa-js'

export default new Auth0Client({
  domain: 'monneda.us.auth0.com',
  audience: 'https://api.monneda.com',
  client_id: 'wXUXvTKAbog7si5kiaP5Be8Td23XOtRC',
  redirect_uri: `${window.location.origin}/#/callback`
})
