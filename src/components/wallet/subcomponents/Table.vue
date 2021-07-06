<template>
  <b-table
    :responsive="true"
    hover
    :fields="fields"
    :items="assets"
    small
    borderless
    tbody-tr-class="text-nowrap"
  >
    <!-- Thumbnail -->
    <template #cell(imageLink)="data">
      <b-avatar
        rounded
        responsive="true"
        icon="wallet2"
        variant="success"
        :to="`/assets/${data.item.ticker}`"
        :src="thumb(data.item.ticker)"
      />
    </template>

    <!-- Name and ticker -->
    <template #cell(nameticker)="data">
      <small class="text-secondary text-truncate"> {{ data.item.name }} </small>
      <br>
      <small class="text-secondary"> {{ (data.index + 1).toString() + ' .'}} </small>
      <span class="text-monospace"> {{ data.item.ticker.toUpperCase() }} </span>
    </template>

    <!-- Weight -->
    <template #cell(weight)="data">
      <small class="text-secondary"> Peso </small>
      <br>
      <span class="text-monospace"> {{ data.value.toFixed(1) }}% </span>
    </template>

    <!-- Price -->
    <template #head(price)="data">
      <span v-b-tooltip.hover title="Relativo ao último fechamento">{{ data.label }}</span>
    </template>
    <template #cell(price)="data">
      <small class="text-secondary"> Preço (R$) </small>
      <br>
      <span class="text-monospace"> {{ data.value.toFixed(2) }} </span>
    </template>

    <!-- Profit -->
    <template #cell(gain)="data">
      <small class="text-secondary"> Variação </small>
      <small class="text-secondary" v-if="show">
        {{ getSelectedPeriodText }}
      </small>
      <br>
      <span v-if="show" :class="positive(data.value)" class="text-monospace">
        {{ data.value.toFixed(2) }}%
      </span>
      <span v-else class="text-monospace"> -.--% </span>
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
