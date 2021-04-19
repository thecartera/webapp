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
      plugins: {
        colorSchemes: {
          // Choose one from:
          //    https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
          scheme: 'brewer.Paired12'
        }
      }
    }
  }),

  computed: {
    data () {
      return {
        labels: this.assets.map(i => i.ticker),
        datasets: [{
          label: 'Carteira',
          data: this.assets.map(i => i.weight)
        }]
      }
    }
  },

  mounted () {
    this.renderChart(this.data, this.options)
  }
}

</script>
