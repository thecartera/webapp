
const BASE = 'https://monneda.herokuapp.com/api'
// const BASE = 'http://localhost:8080/api'

export default class {
  constructor (token) {
    this.token = token
  }

  async request (meth, path, opts = {}, json = true) {
    const url = [BASE, path].join('/')

    if (!opts.headers) {
      opts.headers = {}
    }

    if (this.token) {
      opts.headers.Authorization = `Bearer ${this.token}`
    }

    const options = {
      method: meth,
      mode: 'cors',
      ...opts
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw response
    }

    if (json) {
      return await response.json()
    } else {
      return response
    }
  }
}
