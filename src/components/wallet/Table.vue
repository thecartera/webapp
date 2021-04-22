<template style="margin-left: 10rem">
  <b-table style="margin-left: 10rem" responsive='lg' hover :fields="fields" :items="assets" small borderless>
    <!-- Thumbnail -->
    <template #cell(imageLink)="data">
      <span style="padding: 0.2rem 0rem">
        <b-avatar
          rounded
          icon="wallet2"
          variant="light"
          :src="thumb(data.item.ticker)"
        />
      </span>
    </template>

    <!-- Name and ticker -->
    <template #cell(nameticker)="data">
      <span class="cell-name"> {{ data.index + 1 }}. {{ data.item.name }} </span>
      <br>
      <span class="cell-value"> {{ data.item.ticker.toUpperCase() }} </span>
    </template>

    <!-- Weight -->
    <template #cell(weight)="data">
      <span class="cell-name"> Peso </span>
      <br>
      <span class="monneda-blue cell-value"> {{ data.value.toFixed(1) }}% </span>
    </template>

    <!-- Price -->
    <template #cell(price)="data">
      <span class="cell-name"> Preço (R$) </span>
      <br>
      <span class="monneda-blue cell-value">{{ data.value.toFixed(2) }}</span>
    </template>

    <!-- Profit -->
    <template #cell(gain)="data">
      <span class="cell-name"> Ganho 30d </span>
      <br>
      <span :class="positive(data.value)" class="cell-value">
        {{ data.value.toFixed(2) }}%
      </span>
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
      { key: 'weight', label: 'Peso', class: 'text-center', sortable: true },
      { key: 'price', label: 'Preço', class: 'text-center', sortable: true },
      { key: 'gain', label: 'Ganho', class: 'text-center', sortable: true }
    ]
  }),

  props: {
    assets: {
      type: Array,
      default: () => []
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
.cell-value {
  font-family: 'Courier New';
  font-size: 1.05rem;
}

.cell-name {
  font-size: 0.65rem;
  color: gray;
}

.monneda-blue {
  color: #0275B1;
}
</style>
