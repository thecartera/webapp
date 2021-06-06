<template>
  <div>
    <!-- Event -->
    <b-row class="pt-1">
      <b-col>
        {{ text }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'NewAccountEventItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    text () {
      return '🎉 ' + this.item.owner.name + ' criou sua conta 🎉 '
    }
  }
}
</script>
