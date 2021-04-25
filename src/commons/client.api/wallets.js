import Client from './client'

export default class extends Client {
  fetchById (id) {
    return this.request('GET', `wallets/${id}`)
  }

  fetchByOwner (owner) {
    return this.request('GET', `users/${owner}/wallets`)
  }

  postNewWallet (wallet) {
    const options = {
      body: JSON.stringify(wallet),
      headers: { 'Content-Type': 'application/json' }
    }
    return this.request('POST', 'wallets', options)
  }

  deleteById (id) {
    return this.request('DELETE', `wallets/${id}`, {}, false)
  }
}
