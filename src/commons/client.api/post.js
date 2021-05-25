import Client from './client'

export default class extends Client {
  getPost (id) {
    return this.request('GET', `post/${id}`)
  }

  likePost (id) {
    return this.request('POST', `post/${id}/like`, {}, false)
  }

  unlikePost (id) {
    return this.request('POST', `post/${id}/unlike`, {}, false)
  }

  getLikeUsers (id) {
    return this.request('GET', `post/${id}/likeUsers`)
  }
}
