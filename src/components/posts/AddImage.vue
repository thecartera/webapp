<template>
  <b-modal
    id="addImage"
    ref="addImageModal"
    title="Adicionar imagem na publicação"
    ok-title="Adicionar"
    ok-variant="success"
    cancel-title="Cancelar"
    @ok="handleOk"
    @hidden="resetModal"
  >
    <!-- PICTURE -->
    <b-row class="mb-2" align-h="center">
      <b-col>
        <b-form-group
          id="fieldPicture"
          label="URL da imagem:"
          description="Selecione 'copiar link da imagem'"
          label-for="picURLInput"
          style="white-space: pre-wrap"
        >
          <b-form-input
            style="font-size: 0.8rem"
            id="picURLInput"
            v-model="picURL"
            trim/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="ml-1 mr-1" v-if="picURL">
      <b-img thumbnail center :src="picURL" style="max-width: 100%; max-height: 25rem;"></b-img>
    </b-row>
  </b-modal>
</template>

<script>

export default {
  name: 'AddImage',

  data: () => ({
    picURL: ''
  }),

  methods: {
    show (picUrl) {
      this.picURL = picUrl
      this.$refs.addImageModal.show()
    },

    handleOk () {
      this.$emit('updateImage', this.picURL)
    },

    resetModal () {
      this.picURL = ''
    }
  }
}
</script>

<style scoped>

</style>
