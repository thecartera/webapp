<template>
<b-container>
  <b-row align-h="center">
    <h5> Adicionar descrição </h5>
  </b-row>
  <b-form>
    <b-container>
      <b-row align-h="center">
        <b-textarea
          v-model="value"
          class="w-75"
          @update="onUpdate"
          placeholder="Descreva sua carteira"
          :formatter="formatter"
        />
        <b-form-text class="w-75">
          {{ `${value.length}/${maxLengthInCars}` }}
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
