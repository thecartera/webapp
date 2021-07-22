<template>
<b-avatar
  rounded
  icon="wallet2"
  variant="white"
  responsive="true"
  v-bind="$attrs"
  :src="url"
/>
</template>

<script>
const BASE = 'https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/'

export default {
  name: 'AssetIcon',
  props: {
    code: {
      type: String,
      default: null
    }
  },
  computed: {
    url () {
      if (this.code) {
        return BASE + `${this.code}.png`
      }
      return null
    }
  }
}
</script>
