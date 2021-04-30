<template>
<b-container>
  <b-row align-h="center">
    <h5> Adicionar descrição </h5>
  </b-row>
  <b-form>
    <b-container>
      <b-row align-h="center">
        <b-textarea
          id="descrComponent"
          @update="onUpdate"
          placeholder="Descreva sua carteira"
          :formatter="formatter"
          :value="receivedDescription ? receivedDescription : ''"
          rows="3"
          max-rows="6"
          no-resize
        />
        <b-form-text>
          {{ `${descriptionLen}/${maxLenInChars}` }}
        </b-form-text>
      </b-row>
    </b-container>
  </b-form>
</b-container>
</template>

<script>
export default {
  name: 'WalletAddDescription',

  data: () => ({
    maxLenInChars: 280,
    description: ''
  }),

  props: {
    receivedDescription: {
      type: String,
      required: false
    }
  },

  methods: {
    formatter (value) {
      if (value.length > this.maxLenInChars) {
        return value.substring(0, this.maxLenInChars)
      }
      return value
    },
    onUpdate (event) {
      this.$emit('update', event)
      this.description = event
    }
  },

  computed: {
    descriptionLen () {
      return this.description.length
    }
  },

  mounted () {
    this.description = ''
    if (this.receivedDescription) {
      this.description = this.receivedDescription
    }
    this.$emit('update', this.description)
  }
}
</script>

<style scoped>

/* Small devices (mobile & Tablet, 768px and below) */
@media only screen and (max-width: 768px) {
  #descrComponent {
    width: 100%;
  }
}

/* Small devices (mobile & Tablet, 768px and below) */
@media only screen and (min-width: 768px) {
  #descrComponent {
    width: 50%;
  }
}

</style>
