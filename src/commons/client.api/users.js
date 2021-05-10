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

  follow (username) {
    return this.request('POST', `users/${username}/follow`, {}, false)
  }

  unfollow (username) {
    return this.request('POST', `users/${username}/unfollow`, {}, false)
  }

  following (username) {
    return this.request('GET', `users/${username}/following`)
  }

  followers (username) {
    return this.request('GET', `users/${username}/followers`)
  }

  updateMyUser (data) {
    const options = {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json-patch+json' }
    }
    return this.request('PATCH', 'profile', options)
  }
}
