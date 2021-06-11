<template>
  <ais-instant-search :search-client="$meili" :index-name="index">
    <b-row align-h="center">
      <h5> Adicionar ativo </h5>
    </b-row>
    <b-row align-h="center">
      <b-form @keyup.enter.prevent="submit">
        <b-row>
          <!-- Ticker -->
          <b-col>
            <!-- Conf -->
            <ais-configure :hits-per-page.camel="hits" />
            <ais-search-box v-model="ticker">
              <b-form-input
                v-model="ticker"
                placeholder="Código"
                @update="activeDropdown"
              />
            </ais-search-box>
            <ais-hits>
              <template slot-scope="{ items }">
                <b-dropdown-group v-show="showDropdown && items.length>0" class="dropdown" style="list-style: none; background-color: #ddd; z-index:1; width:12rem">
                  <b-dropdown-item
                    v-for="item in items"
                    :key="item.codneg"
                    @click="onClick(item.codneg)"
                  >
                  <b-row align-v="center">
                    <!-- Info -->
                    <b-avatar
                      rounded
                      icon="wallet2"
                      variant="light"
                      :src="thumb(item.codneg)"
                    />
                    <b-col cols="auto">
                      <span class="cell-name">
                        {{ item.nomres }}
                      </span>
                      <br>
                      <span class="cell-value">
                        {{ item.codneg }}
                      </span>
                    </b-col>
                  </b-row>
                  </b-dropdown-item>
                </b-dropdown-group>
              </template>
            </ais-hits>
          </b-col>

          <!-- Amount -->
          <b-col>
            <b-form-input
              v-model="amount"
              @keypress="onlyNumber($event)"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Quantidade"
              trim
            />
          </b-col>

          <!-- Submit button -->
          <b-col>
            <b-button @click="submit" variant="secondary">
              <b-icon icon="plus" variant="light" />
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-row>
  </ais-instant-search>
</template>

<script>
import client from '@/commons/client.api'

export default {
  name: 'WalletAddTicker',

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
    ticker: '',
    amount: '',
    clicked: false
  }),

  computed: {
    showDropdown () {
      return this.ticker.length && !this.clicked
    }
  },

  methods: {
    submit () {
      if (this.ticker.length > 0 && this.amount.length > 0) {
        const data = {
          ticker: this.ticker.toUpperCase(),
          amount: this.amount
        }

        this.$emit('submit', data)

        this.ticker = ''
        this.amount = ''
      }
    },

    activeDropdown () {
      this.clicked = false
    },

    onClick (event) {
      this.ticker = event
      this.clicked = true
    },

    onlyNumber (evt) {
      // we only want integers.
      // using 'isNaN' lets unwanted chars like '-' and math numbers like 'e'
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      if (evt.key in numbers && this.amount.length < 8) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    only8chars (evt) {
      if (this.ticker.length < 8) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    thumb (ticker) {
      try {
        return client.utils.thumbUrl(ticker)
      } catch {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  background-color: #dddd;
  border-radius: 0.5rem;
  overflow: hidden;
}

.cell-value {
  font-family: 'Courier New';
  font-size: 1.05em;
}

.cell-name {
  font-size: 0.65em;
  color: gray;
}
</style>
