<template>
  <b-card>
    <b-row>
      <!-- Image -->
      <b-col cols="2">
        <b-avatar
          rounded
          size="4rem"
          :src="user.picture"
          :to="`/users/${user.username}`"
        />
      </b-col>

      <!-- Info -->
      <b-col v-if="$store.state.auth.auth">
        <b-row>
          <b-link :to="`/users/${user.username}`">
            @{{ user.username }}
          </b-link>
        </b-row>
        <b-row> {{ user.name }} </b-row>
      </b-col>

      <!-- Buttons -->
      <b-col cols="2">
        <!-- Unfollow -->
        <b-button v-if="user.following" variant="secondary" @click="unfollow">
          Unfollow
        </b-button>

        <!-- Follow -->
        <b-button v-else variant="success" @click="follow">
          Follow
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'SimpleUserCard',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    async follow () {
      this.$emit('follow', this.user)
    },
    async unfollow () {
      this.$emit('unfollow', this.user)
    }
  }
}
</script>
