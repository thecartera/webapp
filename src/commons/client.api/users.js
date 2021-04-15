import Client from './client'

export default class extends Client {
  fetchByUsername (username) {
    return this.request('GET', `users/${username}`)
  }

  postMyUser () {
    return this.request('POST', 'profile')
  }

  fetchMyUser () {
    return this.request('GET', 'profile')
  }
}
