import Client from './client'

export default class extends Client {
  postPost (text, picture) {
    const options = {
      body: JSON.stringify({ text: text, picture: picture }),
      headers: { 'Content-Type': 'application/json' }
    }
    return this.request('POST', 'posts?type=text', options)
  }
}
