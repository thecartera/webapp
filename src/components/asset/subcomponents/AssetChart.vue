<script>
import { Line } from 'vue-chartjs'
import client from '@/commons/client.api'

// custom (top) tooltip
// DO NOT delete comment below
// eslint-disable-next-line no-undef
Chart.Tooltip.positioners.top = (elements, eventPosition) => {
  if (!elements) {
    return false
  }
  if (!elements.length) {
    return false
  }
  if (!elements[0]._chart.tooltip._view) {
    return false
  }
  var pos = elements[0]._chart.chartArea.bottom
  var topPos = elements[0]._chart.chartArea.top
  var tooltipHeight = elements[0]._chart.tooltip._view.height + elements[0]._chart.tooltip._view.footerMarginTop

  // The very first hover event might not have drawn the tooltip yet so make up
  // some height value using the default font size plus some margin
  if (isNaN(tooltipHeight)) {
    tooltipHeight = elements.length * 12 + 26
  }

  elements.forEach(function (element) {
    if (element._view.y > pos - tooltipHeight) {
      pos = topPos
    }
  })

  return {
    x: elements[0]._view.x,
    y: 0
  }
}

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
            borderDash: [2, 2]
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: '#EEF0F4',
            borderDash: [2, 2]
          }
        }]
      },
      tooltips: {
        caretSize: 4,
        backgroundColor: '#4F5565',
        titleFontStyle: 'normal',
        titleFontSize: 12,
        titleAlign: 'center',
        bodyFontFamily: "'Proxima Nova', sans-serif",
        cornerRadius: 3,
        bodyFontColor: '#0dd',
        bodyFontSize: 13,
        xPadding: 2,
        yPadding: 2,
        // position: 'top',
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
            return `R$${currentValue.toFixed(2)}`
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
      this.profit = prices[prices.length - 1] > prices[0]
      const color = prices[prices.length - 1] > prices[0] ? '#00c80515' : '#ff000022'
      const bordercolor = prices[prices.length - 1] > prices[0] ? '#00c805' : '#ff0000bb'
      prices.push(Math.max(...prices) * 1.15) // max Y val so highest point doesn't touch top of chart
      prices.push(Math.min(...prices) * 0.85) // min Y val so lowest point doesn't touch bottom of chart
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
            hitRadius: 1, // radius to detect hover
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
