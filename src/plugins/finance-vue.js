import Vue from 'vue'

const BASE = 'https://monneda.herokuapp.com'
// const BASE = 'http://localhost:8080'

const buildUrl = (...paths) => [BASE, ...paths].join('/')

const request = (meth, path, opts = {}) => {
  const url = buildUrl(path)
  console.log(`${meth}: ${url}`)

  const options = {
    method: meth,
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    ...opts
  }
  console.log('opts:', options)

  return fetch(url, options)
    .then(r => r.json())
}

const fetchAsset = async ticker => {
  return request('GET', `assets/${ticker}`)
}

const postWallet = wallet => {
  const options = { body: JSON.stringify(wallet) }
  return request('POST', 'wallets', options)
}

const fetchWallet = id => {
  return request('GET', `wallets/${id}`)
}

const finance = {
  fetchAsset,
  postWallet,
  fetchWallet
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
