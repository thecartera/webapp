import Client from './client'

export default class extends Client {
  getFeed (size, beforeId) {
    if (beforeId && size) {
      return this.request('GET', `feed?size=${size}&before_id=${beforeId}`)
    } else if (size) {
      return this.request('GET', `feed?size=${size}`)
    } else {
      return this.request('GET', 'feed?size=20')
    }
  }
}
