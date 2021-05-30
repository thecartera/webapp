import Client from './client'

export default class extends Client {
  fetchById (id, days = 30) {
    return this.request('GET', `wallets/${id}?days=${days}`)
  }

  fetchMyById (id) {
    return this.request('GET', `wallets/${id}?type=raw`)
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

  updateWallet (wallet, id) {
    const options = {
      body: JSON.stringify(wallet),
      headers: { 'Content-Type': 'application/json' }
    }
    return this.request('PUT', `wallets/${id}`, options)
  }

  deleteById (id) {
    return this.request('DELETE', `wallets/${id}`, {}, false)
  }

  getHistory (id) {
    return this.request('GET', `wallets/${id}/history`)
  }
}
