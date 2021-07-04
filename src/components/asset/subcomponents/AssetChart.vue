<script>
import { Line } from 'vue-chartjs'
import client from '@/commons/client.api'

export default {
  extends: Line,

  props: {
    days: {
      type: Number,
      required: true
    },
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    options: {
      showScale: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          gridLines: {
            display: true,
            color: '#EEF0F4',
            borderDash: [5, 5]
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: '#EEF0F4',
            borderDash: [5, 5]
          }
        }]
      },
      tooltips: {
        backgroundColor: '#4F5565',
        titleFontStyle: 'normal',
        titleFontSize: 14,
        bodyFontFamily: "'Proxima Nova', sans-serif",
        cornerRadius: 3,
        bodyFontColor: '#00c805',
        bodyFontSize: 18,
        xPadding: 14,
        yPadding: 14,
        displayColors: false,
        mode: 'index',
        intersect: false,
        callbacks: {
          title: tooltipItem => {
            return `${tooltipItem[0].xLabel}`
          },
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex]
            const currentValue = dataset.data[tooltipItem.index]
            return `R$ ${currentValue.toLocaleString()}`
          }
        }
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  methods: {
    async calcAssetHistory () {
      this.history = await client.assets.fetchTickerHistory(this.ticker, this.days)
      const prices = []
      const dates = []
      for (const item of this.history.prices) {
        prices.push(item.price)
        const localDate = new Date(item.date).toLocaleDateString('pt-BR').substring(0, 5)
        dates.push(localDate)
      }
      const color = prices[prices.length - 1] > prices[0] ? '#00c80515' : '#ff000022'
      const bordercolor = prices[prices.length - 1] > prices[0] ? '#00c805' : '#ff0000bb'
      prices.push(Math.max(...prices) * 1.03) // max Y val so highest point doesn't touch top of chart
      prices.push(Math.min(...prices) * 0.97) // min Y val so lowest point doesn't touch bottom of chart
      this.renderChart({
        labels: dates,
        datasets: [
          {
            label: 'Preço no dia (R$)',
            data: prices,
            lineTension: 0, // zero so no smoothing, completely straight lines
            fill: true, // fill with color area below line
            borderColor: bordercolor, // line color
            borderWidth: 3, // line width
            backgroundColor: color, // background of filled area below line
            radius: 0, // zero so no points are rendered unless hovered
            hitRadius: 5, // radius to detect hover
            pointHoverRadius: 5, // radius of point when it is hovered
            hoverBackgroundColor: bordercolor,
            pointHoverBackgroundColor: bordercolor,
            pointHoverBorderColor: bordercolor,
            pointHoverBorderWidth: 2,
            hoverBorderWidth: 5,
            clip: { left: -1, top: -1, right: -1, bottom: -1 }
          }
        ]
      }, this.options
      )
    }
  },

  async mounted () {
    await this.calcAssetHistory()
  },

  watch: {
    async days () { // watch if opening another asset page
      await this.calcAssetHistory()
    },
    async ticker () { // watch if period changed
      await this.calcAssetHistory()
    }
  }
}

</script>
