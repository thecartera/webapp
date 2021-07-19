<script>
import { Doughnut } from 'vue-chartjs'
import client from '@/commons/client.api'

export default {
  extends: Doughnut,

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    options: {
      tooltips: {
        enabled: true,
        callbacks: {
          // Add '%' to weight tooltip
          label: function (tooltipItem, data) {
            const ticker = data.labels[tooltipItem.index]
            const label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            return ticker + ': ' + label + '%'
          }
        }
      },
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          boxWidth: 12,
          padding: 5,
          usePointStyle: false,
          fontFamily: 'Courier New'
        }
      },
      plugins: {
        colorschemes: {
          // Choose one from:
          //    https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
          // also comment the line 'backgroundColor: this.customColors,' on this.data.datasets
          scheme: 'tableau.Tableau20'
        }
      }
    }
  }),

  computed: {
    data () {
      const [tickers, weights] = this.sortData
      return {
        labels: tickers,
        datasets: [{
          data: weights,
          borderWidth: 1
        }]
      }
    },

    sortData () {
      const myAssets = []
      for (let i = 0; i < this.assets.length; i++) {
        myAssets.push([this.assets[i].ticker, this.assets[i].weight])
      }
      myAssets.sort(function compare (kv1, kv2) {
        // This comparison function has 3 return cases:
        // - Negative number: kv1 should be placed BEFORE kv2
        // - Positive number: kv1 should be placed AFTER kv2
        // - Zero: they are equal, any order is ok between these 2 items
        return kv2[1] - kv1[1]
      })
      const sectors = {}
      for (let i = 0; i < myAssets.length; i++) {
        const ticker = myAssets[i][0]
        const sector = this.getSector(ticker)
        sectors[sector] = 0
      }
      for (let i = 0; i < myAssets.length; i++) {
        const ticker = myAssets[i][0]
        const sector = this.getSector(ticker)
        const weight = myAssets[i][1]
        sectors[sector] += parseFloat(weight)
      }
      const tickers = Object.keys(sectors)
      const weights = []
      for (const weight of tickers) {
        weights.push(sectors[weight].toFixed(2))
      }
      return [tickers, weights]
    }
  },

  methods: {
    getSector (ticker) {
      // TODO: we need to get the proper sectors from ETFs (and FIIs) as we don't have them now
      const sector = 'FIIs e ETFs'
      try {
        return client.utils.getSector(ticker)
      } catch {
        return sector
      }
    }
  },

  mounted () {
    this.renderChart(this.data, this.options)
  }
}

</script>
