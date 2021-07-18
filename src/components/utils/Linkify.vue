<template>
<span>
  <template v-for="({ text, tag }, i) of tags">
    <b-link v-if="tag === 'link'" :key="i" :href="text">{{ text }}</b-link>
    <b-link v-else-if="tag === 'cash'" :key="i" :to="`/assets/${text}`">${{ text }}</b-link>
    <b-link v-else-if="tag === 'mention'" :key="i" :to="`/users/${text}`">@{{ text }}</b-link>
    <template v-else>{{ text }}</template>
  </template>
</span>
</template>

<script>
const split = (text, regex, tag) => {
  const splits = text.split(regex)
  const matches = Array.from(text.matchAll(regex))

  const results = []
  for (let i = 0; i < splits.length - 1; i += 2) {
    results.push({ text: splits[i], tag: 'text' })
    results.push({ text: matches[i / 2][1], tag: tag })
  }
  results.push({ text: splits[splits.length - 1], tag: 'text' })

  return results
}

export default {
  name: 'Linkify',

  props: {
    text: {
      type: String,
      default: ''
    }
  },

  computed: {
    tags () {
      const cash = /\$(\w+)/gim
      const mention = /@(\w+)/gim
      const http = /(https?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim

      let results = split(this.text, http, 'link')

      for (let i = 0; i < results.length; i++) {
        const { text, tag } = results[i]
        if (tag === 'text') {
          const splits = split(text, cash, 'cash')
          results.splice(i, 1, splits)
        }
      }

      results = results.flat()

      for (let i = 0; i < results.length; i++) {
        const { text, tag } = results[i]
        if (tag === 'text') {
          const splits = split(text, mention, 'mention')
          results.splice(i, 1, splits)
        }
      }

      return results.flat()
    }
  }
}
</script>
