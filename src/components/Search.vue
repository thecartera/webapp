<template>
  <ais-instant-search :search-client="$meili" :index-name="index">
    <!-- Conf -->
    <ais-configure :hits-per-page.camel="hits" />

    <!-- Input -->
    <ais-search-box v-model="input">
      <b-form-input
        size="sm"
        placeholder="Encontre seus amigos"
        v-model="input"
        @keypress.enter.prevent="search"
      />
    </ais-search-box>

    <!-- Hits -->
    <ais-hits>
      <template slot-scope="{ items }">
        <b-dropdown-group v-show="input" class="dropdown">
          <b-dropdown-item
            v-for="item in items"
            :key="item.username"
            :to="`/users/${item.username}`"
            @click="clear"
          >
          <b-row>
            <!-- Picture -->
            <b-col cols="auto" class="p-0 m-0">
              <b-avatar :src="item.picture" />
            </b-col>

            <!-- Info -->
            <b-col>
              <p class="m-0 p-0 text-sm font-weight-bold">
                @{{ item.username }}
              </p>
              <p class="m-0 p-0 text-sm">
                {{ truncate(item.name) }}
              </p>
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
    truncate (name) {
      if (name.length <= 25) {
        return name
      }
      return name.substring(0, 22) + '...'
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
