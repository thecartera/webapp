import Vue from 'vue'

// const BASE = 'https://monneda.herokuapp.com/'
const BASE = 'http://localhost:8080/api'

const buildUrl = (...paths) => [BASE, ...paths].join('/')

const request = (meth, path, opts = {}) => {
  const url = buildUrl(path)
  console.log(`${meth}: ${url}`)

  const options = {
    method: meth,
    mode: 'cors',
    ...opts
  }
  console.log('opts:', options)

  return fetch(url, options)
    .then(r => r.json())
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
    return request('GET', 'users', options)
  }
  return request('GET', 'users')
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

const registerMyUser = accessToken => {
  if (accessToken) {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    return request('POST', 'users', options)
  }
  return request('POST', 'users')
}

const finance = {
  fetchAsset,
  postWallet,
  fetchWallet,
  fetchMyUser,
  fetchUser,
  registerMyUser
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
