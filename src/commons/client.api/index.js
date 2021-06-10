import Client from './client'
import Users from './users'
import Assets from './assets'
import Wallets from './wallets'
import Feed from './feed'
import Utils from './utils'
import Post from './post'
import Events from './events'

class MyClient extends Client {
  constructor (token) {
    super(token)
    this.users = new Users(token)
    this.assets = new Assets(token)
    this.wallets = new Wallets(token)
    this.feed = new Feed(token)
    this.post = new Post(token)
    this.events = new Events(token)
    this.utils = Utils
  }

  setToken (token) {
    this.token = token
    this.users.token = token
    this.assets.token = token
    this.wallets.token = token
    this.feed.token = token
    this.post.token = token
    this.events.token = token
  }
}

export default new MyClient()
