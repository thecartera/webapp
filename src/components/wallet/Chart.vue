<script>
import { Doughnut } from 'vue-chartjs'

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
        position: 'right',
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
      const myData = this.sortData // returns [tickers, weights]
      return {
        labels: myData[0],
        datasets: [{
          data: myData[1],
          // backgroundColor: this.customColors,
          borderWidth: 1
        }]
      }
    },

    customColors () {
      const colors = [
        'rgb(0,135,90)',
        'rgb(70,125,105)',
        'rgb(155,190,135)',
        'rgb(115,195,150)',
        'rgb(235,215,140)',
        'rgb(230,190,130)',
        'rgb(225,150,95)',
        'rgb(225,100,80)',
        'rgb(200,75,80)',
        'rgb(170, 100, 50)',
        'rgb(96,96,96)',
        'rgb(169,169,169)',
        'rgb(155,55,100)',
        'rgb(80,35,115)',
        'rgb(145,100,180)',
        'rgb(225,120,165)',
        'rgb(225,90,140)',
        'rgb(100,100,200)',
        'rgb(85,150,195)',
        'rgb(200, 235, 220)',
        'rgb(232,232,232)'
      ]
      return colors
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
      const tickers = []
      const weights = []
      let maxAssets = 50
      if (myAssets.length < maxAssets) {
        maxAssets = myAssets.length
      }
      let totalWeight = 0.0
      for (let i = 0; i < maxAssets; i++) {
        const ticker = myAssets[i][0]
        tickers.push(ticker)
        const weight = myAssets[i][1]
        weights.push(weight.toFixed(2))
        totalWeight += weight
      }
      if (myAssets.length > maxAssets) {
        tickers.push('Outros')
        const missingWeight = 100.0 - totalWeight
        weights.push(missingWeight.toFixed(2))
      }
      return [tickers, weights]
    }
  },

  mounted () {
    this.renderChart(this.data, this.options)
  }
}

</script>
