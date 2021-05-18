module.exports = {
  publicPath: '/',
  pwa: {
    name: 'Cartera',
    shortName: 'Cartera',
    themeColor: '#4e79a7', // is the color at the top of the pwa (doesn't work on apple devices)
    display: 'standalone',
    scope: 'www.cartera.com.br',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      lang: 'pt',
      background_color: '#4e79a7', // used automatically by android for splash screen
      description: 'A rede social de investidores para você ver e acompanhar as carteiras de ações dos seus amigos',
      categories: ["financas", "investimentos", "finances", "investments", "b3", "ações"]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
