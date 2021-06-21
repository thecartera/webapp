<template>
  <div>
    <!-- Event -->
    <b-row class="p-2">
      <b-col>
        <span style="white-space: pre-wrap" class="text-break" v-html="linkifiedText">  </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'PostEventItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    linkifiedText: ''
  }),

  async created () {
    this.linkifiedText = await client.utils.linkify(this.item.data.text)
  }
}
</script>
