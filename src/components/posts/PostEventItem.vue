<template>
  <div>
    <!-- Event -->
    <b-row class="p-2">
      <b-col>
        <span style="white-space: pre-wrap" class="text-break"> {{item.data.text}} </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'PostEventItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
