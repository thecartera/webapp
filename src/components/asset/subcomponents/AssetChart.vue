<script>
import client from '@/commons/client.api'

import { Line } from 'vue-chartjs'

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    titleAlign: 'center',
    bodyFontColor: '#0dd',
    displayColors: false,
    mode: 'index',
    intersect: false
  }
}

export default {
  extends: Line,
  name: 'AssetChart',

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
    historic: {
      prices: []
    }
  }),

  computed: {
    chart () {
      return {
        labels: this.historic.prices
          .map(i => new Date(i.date))
          .map(i => i.toLocaleDateString('pt-BR'))
          .map(i => i.substring(0, 5)),

        datasets: [{
          label: 'Preço',
          data: this.historic.prices.map(i => i.price),

          // graph
          fill: true,
          backgroundColor: this.backgroundColor, // color below line
          radius: 0, // zero so no points are rendered unless hovered

          // border == line
          borderWidth: 3,
          lineTension: 0, // zero so no smoothing, completely straight lines
          borderColor: this.borderColor,

          // hover
          hitRadius: 1, // radius to detect hover
          pointHoverRadius: 5, // radius of point when it is hovered
          hoverBackgroundColor: this.borderColor,
          pointHoverBackgroundColor: this.borderColor,
          pointHoverBorderColor: this.borderColor,
          pointHoverBorderWidth: 2,
          hoverBorderWidth: 5
        }]
      }
    },

    first () {
      return this.historic.prices[0].price
    },

    last () {
      return this.historic.prices[this.historic.prices.length - 1].price
    },

    backgroundColor () {
      return this.first < this.last ? '#00c80515' : '#ff000022'
    },

    borderColor () {
      return this.first < this.last ? '#00c805' : '#ff0000bb'
    }
  },

  watch: {
    async ticker () {
      this.historic = await client.assets.fetchTickerHistory(this.ticker, this.days)
      this.renderChart(this.chart, CHART_OPTIONS)
    },

    async days () {
      this.historic = await client.assets.fetchTickerHistory(this.ticker, this.days)
      this.renderChart(this.chart, CHART_OPTIONS)
    }
  },

  async mounted () {
    this.historic = await client.assets.fetchTickerHistory(this.ticker, this.days)
    this.renderChart(this.chart, CHART_OPTIONS)
  }
}
</script>
