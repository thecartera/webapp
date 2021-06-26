<template>
  <b-card style="border-color: #DBDAD7" no-body>
    <b-card-header class="pt-1 pb-1 m-0">
      <b-row>
        <b-col cols="auto" class="pl-0 pr-0">
          <b-avatar
            rounded
            src="https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/MGLU3F.png"
            size="md"
          />
        </b-col>
        <b-col class="pl-3" style="line-height:1.35rem">
          <b-row>
            <!-- title Cartera -->
            <span class="cartera-title pl-1"> Cartera </span>
          </b-row>
        </b-col>
        <b-col>
          <b-row align-h="end" class="pt-1 pr-1">
            <b-dropdown no-caret right variant="outline-light">
              <template #button-content>
                <b-icon
                  icon="three-dots-vertical"
                  scale="1"
                  style="cursor: pointer"
                  variant="dark"
                />
              </template>

              <!-- SHARE BUTTONS -->
              <Socials :url="`https://cartera.com.br/#/users/bueno/`"/>
            </b-dropdown>
          </b-row>
        </b-col>
      </b-row>
    </b-card-header>

    <b-card-body class="pl-2 pt-2 pb-0">
    </b-card-body>
  </b-card>
</template>

<script>
// import client from '@/commons/client.api'
import Socials from '@/components/utils/Socials'

export default {
  name: 'AssetInfo',

  components: {
    Socials
  },

  props: {
    ticker: {
      type: String,
      required: true
    }
  },

  data: () => ({
    blabla: 'asdf'
  }),

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    printer () {
      print('hello')
    }
  }

  // watch: {
  //   async ticker (newTicker) { // watch if opening another asset
  //     await this.getSomething(newTicker)
  //   }
  // }
}
</script>
