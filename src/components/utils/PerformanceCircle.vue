<template>
  <b-container class="p-0 m-0">
    <b-iconstack shift-v="3" :scale="scale">
      <b-icon scale="1.8" stacked icon="circle" :variant="pctChange < 0? 'red' : 'success'"/>
      <b-icon v-if="pctChange < 0" stacked icon="arrow-down" variant="red"/>
      <b-icon v-else stacked icon="arrow-up" variant="success"/>
    </b-iconstack>
    <span class="pl-3 mr-2" style="font-size: 1rem">
      {{ pctChange.toFixed(2) }}%
    </span>
  </b-container>
</template>

<script>

export default {
  name: 'PerformanceCircle',

  props: {
    pctChange: {
      type: Number,
      required: true,
      default: 0
    },
    scale: {
      type: Number,
      required: false,
      default: 1
    }
  }
}

</script>
