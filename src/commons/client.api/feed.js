import Client from './client'

export default class extends Client {
  getFeed () {
    return this.request('GET', 'feed')
  }
}
