<template>
  <ais-instant-search :search-client="$meili" :index-name="index">
    <!-- Conf -->
    <ais-configure :hits-per-page.camel="hits" />

    <!-- Input -->
    <ais-search-box v-model="input">
      <b-form-input
        size="md"
        placeholder="Encontre investidores"
        style="font-size:0.85rem"
        v-model="input"
        @keypress.enter.prevent="search"
      />
    </ais-search-box>

    <!-- Hits -->
    <ais-hits>
      <template slot-scope="{ items }">
        <b-dropdown-group v-show="input" class="dropdown" style="background-color: #ddd">
          <b-dropdown-item
            v-for="item in items"
            :key="item.username"
            :to="`/users/${item.username}`"
            @click="clear"
          >
          <b-row class="pr-2">
            <!-- Picture -->
            <b-col cols="auto" class="p-0 m-0">
              <b-avatar :src="item.picture" />
            </b-col>

            <!-- Info -->
            <b-col class="pl-1 pr-0" style="line-height: 1.3rem">
              <b-row>
                <span class="m-0 py-0 pl-3 font-weight-bold">
                  {{ truncate(item.username, 25) }}
                </span>
              </b-row>
              <b-row>
                <span class="m-0 py-0 pl-3">
                  {{ truncate(item.name, 30) }}
                </span>
              </b-row>
            </b-col>
          </b-row>
          </b-dropdown-item>
        </b-dropdown-group>
      </template>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'Search',

  props: {
    index: {
      type: String,
      required: true
    },
    hits: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    input: '',
    items: []
  }),

  methods: {
    truncate (name, size) {
      if (name.length < size) {
        return name
      }
      return name.substring(0, size - 3) + '...'
    },
    async search () {
      try {
        this.profile = await client.users.fetchByUsername(this.inpu)
        this.clear()
        this.$router.push(`/users/${this.input}`)
      } catch {
        this.showErrorToast('Ops!', `Usuário "${this.input}" não existe`)
      }
    },
    showErrorToast (title, message) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 3000,
        variant: 'danger'
      })
    },
    clear () {
      this.input = ''
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  background-color: #dddd;
  border-radius: 0.5rem;
}
</style>
