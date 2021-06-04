export function storeWithUsr (mockedUsr) {
  return {
    state: {
      auth: {
        user: { username: mockedUsr }
      }
    }
  }
}

export function fakeWallet (usr) {
  return {
    id: 'xyz123abcd',
    username: usr,
    name: 'aposentadoria aos 30',
    description: 'no risk',
    gain: '-3'
  }
}
