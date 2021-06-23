<template>
<div class="text-center">
  <b-avatar
    rounded
    icon="wallet2"
    variant="success"
    responsive="true"
    v-bind="$attrs"
    :src="thumbnail"
  />
  <p v-if="showTitle" class="text-secondary small my-0 py-0">
    {{ code }}
  </p>
</div>
</template>

<script>
export default {
  name: 'AssetIcon',

  props: {
    code: {
      type: String,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    thumbnail () {
      return `https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/${this.code}.png`
    }
  }
}
</script>
