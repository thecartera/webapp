import Client from './client'

export default class extends Client {
  fetchByTicker (ticker, days = 30) {
    return this.request('GET', `assets/${ticker}?days=${days}`)
  }

  fetchTickerHistory (ticker, days = 30) {
    return this.request('GET', `assets/${ticker}/history?days=${days}`)
  }
}
