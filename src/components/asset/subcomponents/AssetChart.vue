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
      console.log(dates)
      const color = prices[prices.length - 1] > prices[0] ? '#00ff0033' : '#ff000033'
      const pointcolor = prices[prices.length - 1] > prices[0] ? '#00ff00' : '#ff000066'
      prices.push(Math.max(...prices) * 1.03) // max Y val so highest point doesn't touch top of chart
      prices.push(Math.min(...prices) * 0.97) // min Y val so lowest point doesn't touch bottom of chart
      this.renderChart({
        labels: dates,
        datasets: [
          {
            label: 'Preço no dia (R$)',
            data: prices,
            lineTension: 0,
            fill: true,
            borderColor: color,
            backgroundColor: color,
            pointBackgroundColor: pointcolor,
            pointBorderColor: pointcolor,
            clip: { left: -1, top: -1, right: -1, bottom: -1 }
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
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
