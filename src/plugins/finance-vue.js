import Vue from 'vue'

const BASE = 'http://localhost:8080'

const buildUrl = (...paths) => [BASE, ...paths].join('/')

const quote = ticker => {
  const url = buildUrl('tickers', ticker)
  return fetch(url, { mode: 'cors' })
}

const save = wallet => {
  const url = buildUrl('wallets')
  console.log(url)
  console.log(wallet)
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wallet)
  })
}

const finance = {
  quote,
  save
}

const plugin = {
  install (Vue) {
    Vue.prototype.finance = finance
  }
}

Vue.use(plugin)
