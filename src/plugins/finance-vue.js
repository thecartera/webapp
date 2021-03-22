import Vue from 'vue'

// const BASE = 'https://monneda.herokuapp.com'
const BASE = 'http://localhost:8080'

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

const fetchTicker = async ticker => {
  return request('GET', `tickers/${ticker}`)
}

const postWallet = wallet => {
  const options = { body: JSON.stringify(wallet) }
  return request('POST', 'wallets', options)
}

const fetchWallet = id => {
  return request('GET', `wallets/${id}`)
}

function validNewTickerAmount (amount) {
  if (Number.isInteger(Number(amount)) && amount > 0 && (amount < 2 ** 30)) {
    return true
  } else {
    return false
  }
}

const finance = {
  fetchTicker,
  postWallet,
  fetchWallet,
  validNewTickerAmount
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
