<template>
  <b-card no-body class="p-1 mt-1" :bg-variant="bgcolor" :border-variant="bordercolor">
    <b-row>
      <!-- Image -->
      <b-col cols="auto">
        <b-avatar
          size="2.8rem"
          :src="user.picture"
          :to="`/users/${user.username}`"
        />
      </b-col>

      <!-- User Info -->
      <b-col class="pl-2 user-info-text">
        <b-row>
          <b-link class="text-dark" :to="`/users/${user.username}`">
            <b> {{ user.username }} </b>
          </b-link>
        </b-row>
        <b-row> {{ name }} </b-row>
        <b-row class="text-secondary"> {{ user.title }} </b-row>
      </b-col>

      <!-- Buttons -->
      <b-col class="pt-2 pr-3 pb-2" cols="auto" v-if="$store.state.auth.auth">
        <!-- Unfollow -->
        <b-button
        v-if="user.following"
        variant="outline-dark"
        @click="unfollow"
        size="sm"
        style="width: 5rem">
          Seguindo
        </b-button>

        <!-- Follow -->
        <b-button
          v-if="!user.following && logged_user.username !== user.username"
          variant="success"
          @click="follow"
          size="sm"
          style="width: 5rem">
          <b> Seguir </b>
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
    },
    bgcolor: {
      type: String
    },
    bordercolor: {
      type: String
    }
  },

  computed: {
    name () {
      const name = this.user.name
      return name.length > 20 ? name.substring(0, 17) + '...' : name
    },
    logged_user () {
      return this.$store.state.auth.user
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

<style scoped>
.user-info-text {
  font-size: 0.9rem;
  line-height: 1rem;
}
</style>
