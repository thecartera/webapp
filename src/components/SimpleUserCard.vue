<template>
  <b-card no-body class="user-card">
    <b-row>
      <!-- Image -->
      <b-col cols="auto">
        <b-avatar
          rounded
          size="3rem"
          :src="user.picture"
          :to="`/users/${user.username}`"
        />
      </b-col>

      <!-- User Info -->
      <b-col class="user-info-padding user-info-text">
        <b-row>
          <b-link class="username" :to="`/users/${user.username}`">
            <b> {{ user.username }} </b>
          </b-link>
        </b-row>
        <b-row> {{ name }} </b-row>
        <b-row class="usertitle"> {{ user.title }} </b-row>
      </b-col>

      <!-- Buttons -->
      <b-col class="follow-buttons-padding" cols="auto" v-if="$store.state.auth.auth">
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
.follow-buttons-padding {
  padding-top: 0.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.user-card {
  padding: 0.5rem;
  margin-top: 0.3rem;
  border-color: lightgray;
}

.user-info-padding {
  padding-left: 0.5rem;
}

.user-info-text {
  font-size: 0.9rem;
  line-height: 1rem;
}

.username {
  color: black;
}

.usertitle {
  color: gray;
}

</style>
