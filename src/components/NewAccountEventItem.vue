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
    timestamp () {
      return new Date(this.item.timestamp).toLocaleString('pt-BR').substring(0, 16).split(' ')[0]
    },
    text () {
      return '🎉 ' + this.item.owner.name + ' criou uma conta em ' + this.timestamp + '. 🎉 '
    }
  }
}
</script>
