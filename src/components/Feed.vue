<template>
  <b-container class="cards-l-r-margins" fluid>
    <b-row>
      <b-col cols="0" md="0" lg="3" />
      <b-col cols="12" md="8" lg="6" >
        <li style="list-style: none" v-for="(item, i) in visibleEvents" :key="i" class="my-2">
          <b-card no-body>
            <b-card-header header-class="header"> {{ getTitleByType(item.type) }} </b-card-header>
            <b-card-body style="padding-top: 0.5rem; padding-left: 0.5rem; padding-bottom: 0.5rem">
              <b-row>
                <b-col cols="auto">
                  <b-avatar
                  rounded
                  :src="item.owner.picture"
                  size="2.8rem"
                  :to="`/users/${item.owner.username}`"
                  />
                </b-col>
                <b-col style="line-height:1rem">
                  <b-row>
                    <b-link
                      :to="`/users/${item.owner.username}`"
                      style="font-weight: bold; font-size: 0.9rem; color: black"> {{ item.owner.name }}
                    </b-link>
                  </b-row>
                  <b-row>
                    <b-card-text style="font-size: 0.7rem; color: dimray">
                      {{ item.owner.title? item.owner.title : '(titulo)' }}
                    </b-card-text>
                  </b-row>
                  <b-row>
                    <b-card-text style="font-size: 0.7rem; color: dimray">
                      {{ new Date(item.timestamp).toLocaleString('pt-BR').slice(0, -3) }}
                    </b-card-text>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                <b-link :to="`/users/${item.owner.username}`">
                  @{{ item.owner.username }}
                </b-link>
                <span> {{ getMessageByType(item.type) }} </span>
                <b-link :to="`/wallets/${item.data.walletId}`">
                  carteira
                </b-link>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </li>
        <li v-if="loading" class="text-center mt-5"><b-spinner /></li>
      </b-col>
      <b-col cols="0" md="4" lg="3" style="padding: 0.5rem">
        <b-card>
          <b-row align-h="center">
            <b-col cols="auto">
              <b-avatar
              rounded
              :src="user.picture"
              size="3.2rem"
              :to="`/users/${user.username}`"
              />
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col style="line-height: 1.1rem">
              <b-row align-h="center">
                <b-link
                  :to="`/users/${user.username}`"
                  style="font-weight: bold; color: black"> {{ user.username }}
                </b-link>
              </b-row>
              <b-row align-h="center">
                <b-card-text style="color: gray"> {{ user.title? user.title : '(titulo)' }} </b-card-text>
              </b-row>
              <b-row align-h="center">
                <b-card-text style="color: gray"> {{ user.name }} </b-card-text>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-badge style="color:#F3F2EF; background-color:#F3F2EF" v-b-visible="loadEvents">.</b-badge>
    </b-row>
  </b-container>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'PortfolioTimeline',

  data: () => ({
    events: [],
    show: 6,
    loading: false,
    pageSize: 10
  }),
  computed: {
    visibleEvents () {
      return this.events.slice(0, this.show)
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    loadEvents () {
      if (!this.loading && this.show < this.events.length) {
        this.loading = true
        this.show += this.pageSize
        const beforeId = this.events[this.events.length - 1].id
        const newEvents = client.feed.getFeed(this.pageSize, beforeId)
        this.events.push.apply(this.events, newEvents)
        this.loading = false
      }
    },
    getTitleByType (type) {
      switch (type) {
        case 'NEW_WALLET':
          return 'Criação de carteira'
        default:
          return 'Atualização de carteira'
      }
    },
    getMessageByType (type) {
      switch (type) {
        case 'NEW_WALLET':
          return 'criou uma'
        default:
          return 'atualizou sua'
      }
    }
  },

  async created () {
    this.events = await client.feed.getFeed(this.pageSize * 2)
  }
}
</script>

<style scoped>
.header {
  height:1.5rem;
  padding-top: 0.1rem;
  padding-left: 0.5rem;
  color: darkslategray;
  font-size: 0.9rem
}

.title {
  font-size: medium;
  color: black;
  font-weight: 900;
}
.start {
  color: green;
  font-weight: 700;
}
.inc {
  color: blue;
  font-weight: 700;
}
.dec {
  color: orange;
  font-weight: 700;
}
.end {
  color: red;
  font-weight: 700;
}
.black {
  color: black;
  font-weight: 700;
}

/* Small devices (mobile) won't have padding for the cards, to gain the extra space */
@media only screen and (max-width: 767px) {
  .cards-l-r-margins {
    padding: 0rem 0rem 0rem 0rem;
  }
}
</style>
