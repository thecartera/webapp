<template>
  <b-modal
    id="editProfile"
    ref="editProfileModal"
    title="Editar perfil"
    ok-only
    ok-title="Salvar"
    @ok="handleOk"
    @hidden="resetModal"
  >
    <b-form-group
      id="fieldName"
      label="Nome:"
      label-for="nameInput"
      :invalid-feedback="invalidNameFeedback"
      :state="nameState"
    >
      <b-form-input id="nameInput" v-model="name" :state="nameState" trim/>
    </b-form-group>
    <b-form-group
      id="fieldTitle"
      label="Título:"
      label-for="titleInput"
    >
      <b-form-input
        id="titleInput"
        v-model="title"
        placeholder="Ex: Interessado em Techs"
        trim
      />
    </b-form-group>
    <b-form-group
      id="fieldTitle"
      label="Descrição:"
      label-for="descriptionInput"
      :description="this.normalizedDescription"
      :state="descriptionState"
      :invalid-feedback="invalidDescriptionFeedback"
    >
      <b-form-textarea
        v-model="description"
        placeholder="Adicione uma descrição"
        no-resize
        rows="3"
        size="sm"
        trim
      >
      </b-form-textarea>
    </b-form-group>
  </b-modal>
</template>

<script>
import client from '@/commons/client.api'
import { SET_USER } from '@/store/mutations.type'

export default {
  name: 'EditProfile',

  data: () => ({
    name: '',
    title: '',
    description: ''
  }),

  methods: {
    show () {
      this.$refs.editProfileModal.show()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.nameState || !this.descriptionState) {
        return
      }
      this.commitChanges()
      this.$nextTick(() => this.$bvModal.hide('editProfile'))
    },
    resetModal () {
      this.name = this.user.name
      this.title = this.user.title
      this.description = this.user.description
    },
    commitChanges () {
      try {
        const changes = []
        if (this.name !== this.user.name) {
          changes.push({ op: 'replace', path: '/name', value: this.name })
        }
        if (this.title !== this.user.title) {
          changes.push({ op: 'replace', path: '/title', value: this.title })
        }
        if (this.description !== this.user.description) {
          changes.push({ op: 'replace', path: '/description', value: this.description })
        }
        if (changes.length) {
          const user = client.users.updateMyUser(changes)
          this.$store.dispatch(SET_USER, user)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    nameState () {
      return this.name.length >= 2
    },
    descriptionState () {
      return this.description.length <= 140
    },
    invalidNameFeedback () {
      return 'Insira pelo menos 2 caracteres.'
    },
    invalidDescriptionFeedback () {
      return 'Descrição precisa ser menor que 140 caracteres.'
    },
    normalizedDescription () {
      return `(${this.description.length}/140)`
    }
  },

  created () {
    this.name = this.user.name
    this.title = this.user.title
    this.description = this.user.description
  }
}
</script>

<style scoped>

</style>
