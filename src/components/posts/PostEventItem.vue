<template>
  <div>
    <!-- Event -->
    <b-row class="p-2">
      <b-col>
        <Linkify
          style="white-space: pre-wrap"
          class="text-break"
          :text="item.data.text"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Linkify from '@/components/utils/Linkify'

export default {
  name: 'PostEventItem',

  components: {
    Linkify
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
