<template>
  <b-card>
    <b-card-body>
      <b-row>
        <b-col cols="2">
          <b-avatar src="https://placekitten.com/300/300" size="4rem" />
        </b-col>
        <b-col>
          <h5> Thiago Nigro </h5>
          <p> The rich cousin </p>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </b-col>
      </b-row>
    </b-card-body>

    <template #footer>
      <b-container>
        <b-row>
          <b-col md="auto">
            <b-button> Like </b-button>
          </b-col>
          <b-col md="auto">
            <b-button> Share </b-button>
          </b-col>
          <b-col md="auto">
            <b-button> Comment </b-button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
export default {
  name: 'FeedItem'
}
</script>
