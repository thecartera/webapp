<template>
<div class="row justify-content-center">
  <b-card class="userDataCardSize" :border-variant="debugBorders()" align="center">
    <b-row>
      <!-- USER IMAGE AND LOCATION -->
      <b-col cols="auto">
        <b-avatar :src=picture size="6.8rem"></b-avatar>
        <p style="text-align:center">
          <b-icon style="text-align:center" scale="0.8" icon="cursor-fill" variant="info" aria-hidden="true"></b-icon>
          <span style="font-size:0.65rem;color:gray">{{ normalizedLocation }}</span>
        </p>
      </b-col>
      <!-- USER INFO, LIKE USERNAME, NAME, DESCRIPTION -->
      <b-col style="text-align:left" cols="0">
        <span style="font-size:1.1rem">
          <strong>{{ normalizedUsername }} </strong>
          <b-icon icon="patch-check-fill" scale="0.7" variant="info"></b-icon>
        </span>
        <br>
        <span style="font-size:0.75rem">
          <b>{{ normalizedName }}</b>
        </span>
        <b-card class="descriptionCardSize" no-body :border-variant="debugBorders()" align="left">
          <span style="white-space: pre;font-family:Arial;font-size:0.85rem">{{ normalizedDescription }}</span>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-card :border-variant="debugBorders()" align="left">
      <b-card-title> Carteiras: </b-card-title>
      <ul id="example-1">
        <li v-for="item in normalizedWallets" :key="item.name">
          <a class="monneda-blue" :href="`/#/wallets/${item.name}`"> {{ item.name }} </a>
        </li>
      </ul>
      </b-card>
    </b-row>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    username: String,
    description: String,
    location: String,
    name: String,
    title: String,
    picture: String,
    wallets: Array
  },

  data: () => ({
    fields: [
      { key: 'id', label: '', class: 'text-center' },
      { key: 'id', label: '', class: 'text-center' }
    ]
  }),

  computed: {
    normalizedLocation () {
      return this.location === null ? 'Brasil' : this.location
    },
    normalizedDescription () {
      const descr = this.description
      if (descr === undefined || descr === null) { return '' }
      return descr.substring(0, 99)
    },
    normalizedName () {
      const name = this.name
      return name !== undefined ? name.substring(0, 25) : ''
    },
    normalizedUsername () {
      const username = this.username
      return username === undefined ? 'error' : '@' + username.substring(0, 16)
    },
    normalizedTitle () {
      const title = this.title
      return title !== undefined ? title.substring(0, 15) : ''
    },
    normalizedWallets () {
      // we want wallets to be a list of dicts, not just list of strings
      if (this.wallets !== undefined) {
        var wallets = []
        const len = this.wallets.length
        var i
        for (i = 0; i < len; i++) {
          wallets.push({ name: this.wallets[i] })
        }
        return wallets
      }
      return ''
    }
  },

  methods: {
    debugBorders () {
      const debug = false
      return debug ? 'danger' : 'white'
    }
  }
}
</script>

<style scoped>

.descriptionCardSize {
  min-width: 11rem;
  max-width: 11rem;
  min-height: 5rem;
  max-height: 5rem;
  margin: auto;
}

.userDataCardSize {
  min-height: 9.5rem;
  max-height: 9.5rem;
  margin: auto;
}

.monneda-blue {
  color: #0275B1;
}

</style>
