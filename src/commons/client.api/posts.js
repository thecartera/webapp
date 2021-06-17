import Client from './client'

export default class extends Client {
  postPost (text) {
    const options = {
      body: JSON.stringify({ text: text }),
      headers: { 'Content-Type': 'application/json' }
    }
    return this.request('POST', 'posts?type=text', options)
  }
}
