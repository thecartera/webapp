import Client from './client'

export default class extends Client {
  fetchByTicker (ticker) {
    return this.request('GET', `assets/${ticker}`)
  }
}
