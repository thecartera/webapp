<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,

  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData)
  }
}

</script>
