<template>
  <b-table
    responsive='lg'
    hover
    :fields="fields"
    :items="assets"
    small
    borderless
    class="line-sm pl-3"
  >
    <!-- Thumbnail -->
    <template #cell(imageLink)="data">
      <b-row>
        <b-avatar
          rounded
          icon="wallet2"
          variant="success"
          class="image-size"
          :src="thumb(data.item.ticker)"
        />
      </b-row>
    </template>

    <!-- Name and ticker -->
    <template #cell(nameticker)="data">
      <b-row>
        <b-col>
          <b-row class="ml-2">
            <span class="cell-name"> {{ data.item.name }} </span>
          </b-row>
          <b-row class="ml-2">
            <span class="cell-name"> {{ (data.index + 1).toString() + ' .'}} </span>
            <span class="cell-value"> {{ data.item.ticker.toUpperCase() }} </span>
          </b-row>
        </b-col>
      </b-row>
    </template>

    <!-- Weight -->
    <template #cell(weight)="data">
      <b-row>
        <b-col>
          <b-row align-h="center">
            <span class="cell-name"> Peso </span>
          </b-row>
          <b-row align-h="center">
            <span class="primary cell-value"> {{ data.value.toFixed(1) }}% </span>
          </b-row>
        </b-col>
      </b-row>
    </template>

    <!-- Price -->
    <template #cell(price)="data">
      <b-row>
        <b-col>
          <b-row align-h="center">
            <span class="cell-name"> Preço (R$) </span>
          </b-row>
          <b-row align-h="center">
            <span class="primary cell-value">{{ data.value.toFixed(2) }}</span>
          </b-row>
        </b-col>
      </b-row>
    </template>

    <!-- Profit -->
    <template #cell(gain)="data">
      <b-row>
        <b-col>
          <b-row align-h="center">
            <span class="cell-name"> Variação
              <span v-if="show"> {{ getSelectedPeriodText }} </span>
            </span>
          </b-row>
          <b-row align-h="center">
            <span v-if="show" :class="positive(data.value)" class="cell-value">
              {{ data.value.toFixed(2) }}%
            </span>
            <span v-else class="cell-value"> -.--% </span>
          </b-row>
        </b-col>
      </b-row>
    </template>
  </b-table>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'AssetTable',

  data: () => ({
    fields: [
      { key: 'imageLink', label: '', class: 'text-center' },
      { key: 'nameticker', label: '', class: 'text-left' },
      { key: 'weight', label: 'Peso', class: 'text-center h6', sortable: true },
      { key: 'price', label: 'Preço', class: 'text-center h6', sortable: true },
      { key: 'gain', label: 'Variação', class: 'text-center h6', sortable: true }
    ]
  }),

  props: {
    assets: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    },
    selectedPeriod: {
      type: Number,
      default: 30
    }
  },

  computed: {
    getSelectedPeriodText () {
      let newText = '--'
      switch (this.selectedPeriod) {
        case (7):
          newText = '7d'
          break
        case (30):
          newText = '30d'
          break
        case (90):
          newText = '90d'
          break
        default:
          newText = 'YTD'
          break
      }
      return newText
    }
  },

  methods: {
    positive (value) {
      return value < 0 ? 'text-danger' : 'text-success'
    },

    thumb (ticker) {
      return client.utils.thumbUrl(ticker)
    }
  }
}
</script>

<style scoped>

.line-sm {
  line-height: 1rem;
}

@media only screen and (max-width: 767px) {
  .cell-value {
    font-family: 'Courier New';
    font-size: 0.95rem;
  }

  .cell-name {
    font-size: 0.75rem;
    color: gray;
  }

  .image-size {
    width: 2.2rem;
    height: 2.2rem;
  }
}

@media only screen and (min-width: 767px) {
  .cell-value {
    font-family: 'Courier New';
    font-size: 1.1rem;
  }

  .cell-name {
    font-size: 0.7rem;
    color: gray;
  }

  .image-size {
    width: 2.5rem;
    height: 2.5rem;
  }
}

</style>
