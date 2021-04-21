<template>
  <div class="row justify-content-center">
    <b-container>
      <b-row align-h="center">
        <h5 style="padding: 1.5rem 0rem 0rem 0rem">
          Adicionar descrição
        </h5>
      </b-row>
      <b-form>
          <b-container>
            <div class="row justify-content-center">
              <b-textarea
                v-model="value"
                style="width: 70%"
                @update="onUpdate"
                placeholder="Descreva sua carteira"
                :formatter="formatter"
              />
              <b-form-text style="width: 70%" id="input-live-help">{{ `${value.length}/${maxLengthInCars}`}}</b-form-text>
            </div>
          </b-container>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'WalletAddDescription',

  data: () => ({
    value: '',
    maxLengthInCars: 280
  }),

  methods: {
    formatter (value) {
      if (value.length > this.maxLengthInCars) {
        return this.value.substring(0, this.maxLengthInCars)
      }
      return value
    },
    onUpdate (event) {
      this.$emit('update', event)
    }
  }
}
</script>
