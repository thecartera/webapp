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
/**
 * Creates a list of items to be rendered.
 *
 * It will split the text and return a list
 * of items in the format `{ text, tag }`.
 *
 * The tag will be `text` when the splits
 * do not match the passed regex. Otherwise,
 * it will be the passed tag.
 */
const split = (text, regex, tag) => {
  const splits = text.split(regex)
  const matches = Array.from(text.matchAll(regex))

  const results = []
  // We iterate in 2s because when splitting a string,
  // using grouped regex, it will include the group.
  // For example:
  //    > 'your nice string'.split(/n(ice)/)
  //    [ 'your ', 'ice', ' string' ]
  //    > 'your nice string'.split(/nice/)
  //    [ 'your ', ' string' ]
  //
  // So, in order to ignore the grouped parts, we
  // iterate in 2s.
  for (let i = 0; i < splits.length - 1; i += 2) {
    results.push({ text: splits[i], tag: 'text' })
    // Because we are iterating in 2s, we need to divide
    // the index by 2
    results.push({ text: matches[i / 2][1], tag: tag })
  }

  // As we do not iterate till the end, we insert
  // the last item here, manually.
  // This is done because split will always have
  // one more item than the `matchAll` result. In
  // this case, it will have (2n + 1) items, because
  // of the regex grouping explained above
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
      const cash = /\$([a-z]\w+)/gim
      const mention = /@(\w+)/gim
      const http = /(https?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim

      // Links
      let results = split(this.text, http, 'link')

      // Cashtags
      for (let i = 0; i < results.length; i++) {
        const { text, tag } = results[i]
        if (tag === 'text') {
          const splits = split(text, cash, 'cash')
          results.splice(i, 1, splits)
        }
      }

      results = results.flat()

      // Mentions
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
