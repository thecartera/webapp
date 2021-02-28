import Vue from 'vue'

const BASE = 'https://monneda.herokuapp.com'

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

  return fetch(url, options)
    .then(r => r.json())
}

const fetchQuote = ticker => {
  return request('GET', `tickers/${ticker}`)
}

const postWallet = wallet => {
  const options = { body: JSON.stringify(wallet) }
  return request('POST', 'wallets', options)
}

const finance = {
  fetchQuote,
  postWallet
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
