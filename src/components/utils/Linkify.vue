<template>
<span>
  <template v-for="({ text, link }, i) of tags">
    <a v-if="link" :key="i" :href="text">{{ text }}</a>
    <template v-else>{{ text }}</template>
  </template>
</span>
</template>

<script>
export default {
  name: 'Linkify',

  props: {
    text: {
      type: String,
      default: ''
    },
    regex: {
      type: String,
      default: 'https?://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]'
    }
  },

  computed: {
    tags () {
      const http = new RegExp(this.regex, 'gim')

      const splitted = this.text.split(http)
      const urls = Array.from(this.text.matchAll(http)).map(i => i[0])

      const res = []
      for (let i = 0; i < splitted.length; i++) {
        res.push({ text: splitted[i], link: false })
        res.push({ text: urls[i], link: true })
      }
      res.pop()

      return res
    }
  }
}
</script>
