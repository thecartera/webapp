import Client from './client'
import Users from './users'
import Assets from './assets'
import Wallets from './wallets'

class MyClient extends Client {
  constructor (token) {
    super(token)
    this.users = new Users(token)
    this.assets = new Assets(token)
    this.wallets = new Wallets(token)
  }

  setToken (token) {
    this.token = token
    this.users.token = token
    this.assets.token = token
    this.wallets.token = token
  }
}

export default new MyClient()
