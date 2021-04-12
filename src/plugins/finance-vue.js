import Vue from 'vue'

const BASE = 'https://monneda.herokuapp.com/api'
// const BASE = 'http://localhost:8080/api'

const buildUrl = (...paths) => [BASE, ...paths].join('/')

const request = async (meth, path, opts = {}) => {
  const url = buildUrl(path)

  const options = {
    method: meth,
    mode: 'cors',
    ...opts
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw response
  }

  return await response.json()
}

const fetchAsset = async (ticker, accessToken) => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('GET', `assets/${ticker}`, options)
  }
  return request('GET', `assets/${ticker}`)
}

const postWallet = (wallet, accessToken) => {
  if (accessToken) {
    const options = {
      body: JSON.stringify(wallet),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }
    return request('POST', 'wallets', options)
  }
  const options = { body: JSON.stringify(wallet) }
  return request('POST', 'wallets', options)
}

const fetchWallet = (id, accessToken) => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('GET', `wallets/${id}`, options)
  }
  return request('GET', `wallets/${id}`)
}

const fetchMyUser = accessToken => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('GET', 'profile', options)
  }
  return request('GET', 'profile')
}

const fetchUser = (id, accessToken) => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('GET', `users/${id}`, options)
  }
  return request('GET', `users/${id}`)
}

const fetchWalletsByUser = (id, accessToken) => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('GET', `users/${id}/wallets`, options)
  }
  return request('GET', `users/${id}/wallets`)
}

const registerMyUser = accessToken => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('POST', 'profile', options)
  }
  return request('POST', 'profile')
}

const finance = {
  fetchAsset,
  postWallet,
  fetchWallet,
  fetchMyUser,
  fetchUser,
  fetchWalletsByUser,
  registerMyUser
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
