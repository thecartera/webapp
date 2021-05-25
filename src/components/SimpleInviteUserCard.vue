<template>
  <b-card no-body class="p-1 mt-1" :bg-variant="bgcolor" :border-variant="bordercolor">
    <b-row>
      <!-- Image -->
      <b-col align-self="center" cols="auto" class="pr-2">
        <b-avatar
          size="md"
          :src="user.picture"
          :to="`/users/${user.username}`"
        />
      </b-col>

      <!-- User Info -->
      <b-col class="text-truncate line-short">
        <b-row>
          <b-link class="text-dark sm" :to="`/users/${user.username}`">
            <b> {{ user.username }} </b>
          </b-link>
        </b-row>
        <b-row class="text-secondary xs"> {{ user.name }} </b-row>
        <b-row class="text-secondary xs"> {{ user.title }} </b-row>
      </b-col>

      <!-- Clickable text to follow/unfollow -->
      <b-col style="font-size: 0.8rem" class="ml-3 p-1" align-self="center" cols="auto" v-if="$store.state.auth.auth">
        <!-- Unfollow -->
        <b-card-text
        v-if="user.following"
        class="text-dark"
        style="cursor: pointer"
        @click="unfollow">
          Seguindo
        </b-card-text>

        <!-- Follow -->
        <b-card-text
          class="text-success"
          style="cursor: pointer"
          v-if="!user.following && logged_user.username !== user.username"
          variant="success"
          @click="follow">
          <b> Seguir </b>
        </b-card-text>
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
.xs {
  font-size: 0.8rem;
}
.sm {
  font-size: 0.9rem;
}

.line-short {
  line-height: 1rem;
}
</style>
