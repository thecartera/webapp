<template>
  <div>
    <!-- Event -->
    <b-row class="p-2">
      <b-col>
        {{ item.data.text }}
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
