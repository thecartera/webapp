<template>
<div class="row justify-content-center">
  <b-card class="userDataCardSize" :border-variant="debug()" align="center">
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
        <span style="font-size:0.9rem">
          <b>{{ normalizedName }}</b>
        </span>
        <b-card class="descriptionCardSize" no-body :border-variant="debug()" align="left">
          <span style="white-space: pre;font-family:Arial;font-size:0.85rem">{{ normalizedDescription }}</span>
        </b-card>
      </b-col>
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
    picture: String
  },

  computed: {
    normalizedLocation () {
      return this.location === null ? 'Brasil' : this.location
    },
    normalizedDescription () {
      const desc = this.description
      return desc !== null ? desc.substring(0, 100) : ''
    },
    normalizedName () {
      const name = this.name
      return name !== null ? name.substring(0, 24) : ''
    },
    normalizedUsername () {
      return '@' + this.username.substring(0, 15)
    },
    normalizedTitle () {
      const title = this.title
      return title !== null ? title.substring(0, 15) : ''
    }
  },

  methods: {
    debug () {
      return 'white'
    }
  }
}
</script>

<style scoped>

.descriptionCardSize {
  min-width: 13rem;
  max-width: 13rem;
  min-height: 5rem;
  max-height: 5rem;
  margin: auto;
}

.userDataCardSize {
  min-height: 9.5rem;
  max-height: 9.5rem;
  margin: auto;
}

</style>
