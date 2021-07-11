import VueAnalytics from 'vue-ua'

Vue.use(VueAnalytics, {
  appName: 'Cartera',
  appVersion: '0.1',
  trackingId: '<tracking_id>',
  //vueRouter: router,

  globalDimensions: [
    { dimension: 1, value: 'FirstDimension' },
    { dimension: 2, value: 'SecondDimension' }
  ],

  globalMetrics: [
    { metric: 1, value: 'MyMetricValue' },
    { metric: 2, value: 'AnotherMetricValue' }
  ]
})
