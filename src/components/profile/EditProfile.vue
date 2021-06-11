<template>
  <b-modal
    id="editProfile"
    ref="editProfileModal"
    title="Editar perfil"
    ok-title="Salvar"
    ok-variant="success"
    cancel-title="Cancelar"
    @ok="handleOk"
    @hidden="resetModal"
    @show="resetModal"
  >

    <!-- PICTURE -->
    <b-row class="mb-2" align-h="center">
      <b-col cols="auto" class="mx-2">
        <b-avatar size="lg" :src="picURL"/>
      </b-col>
      <b-col class="pl-0">
        <b-form-group
          id="fieldPicture"
          label="URL da imagem:"
          description="Só serão aceitas URLs do LinkedIn e Facebook (selecione 'copiar link da imagem')"
          label-for="picURLInput"
          style="white-space: pre-wrap"
          :invalid-feedback="invalidPicUrlFeedback"
          :state="picUrlState"
        >
        </b-form-group>
      </b-col>
      <b-form-input
        style="max-width: 93%; font-size: 0.8rem"
        id="picURLInput"
        v-model="picURL"
        :state="picUrlState"
        trim/>
    </b-row>

    <!-- NAME -->
    <b-form-group
      id="fieldName"
      label="Nome:"
      label-for="nameInput"
      :invalid-feedback="invalidNameFeedback"
      :state="nameState"
    >
      <b-form-input id="nameInput" v-model="name" :state="nameState" trim/>
    </b-form-group>

    <!-- TITLE -->
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

    <!-- DESCRIPTION -->
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
    description: '',
    picURL: ''
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

    async resetModal () {
      this.name = this.user.name
      this.title = this.user.title
      this.description = this.user.description || ''
      this.picURL = this.user.picture
    },
    async commitChanges () {
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
        if (this.picURL !== this.user.picture) {
          changes.push({ op: 'replace', path: '/picture', value: this.picURL })
        }
        if (changes.length) {
          const user = await client.users.updateMyUser(changes)
          this.$store.commit(SET_USER, user)
          this.$emit('profileUpdate', user)
        }
      } catch (e) {
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
    picUrlState () {
      const c0 = this.picURL.slice(0, 33) === 'https://lh3.googleusercontent.com'
      const c1 = this.picURL.slice(0, 26) === 'https://cdn.discordapp.com'
      const c2 = this.picURL.slice(0, 28) === 'https://media-exp1.licdn.com'
      const c3 = this.picURL.slice(0, 38) === 'https://scontent.ffln1-1.fna.fbcdn.net'
      if (c0 || c1 || c2 || c3) {
        return true
      }
      return false
    },
    descriptionState () {
      return this.description.length <= 140
    },
    invalidNameFeedback () {
      return 'Insira pelo menos 2 caracteres.'
    },
    invalidPicUrlFeedback () {
      const title = 'Insira uma URL do LinkedIn, Facebook, Google ou Discord \n'
      // const sub = 'Uma URL desses site começa com: \n'
      // const disc = 'Discord: https://cdn.discordapp... \n'
      // const gogl = 'Google: https://lh3.googleusercontent... \n'
      // const lkdn = 'LinkedIn: https://media-exp1.licdn... \n'
      // const fb = 'Facebook: https://scontent.ffln1-1.fna...\n'
      // return title + sub + disc + gogl + lkdn + fb
      return title
    },
    invalidDescriptionFeedback () {
      return 'Descrição deve ter no máximo 140 caracteres.'
    },
    normalizedDescription () {
      return `(${this.description.length}/140)`
    }
  },

  created () {
    this.resetModal()
  }
}
</script>

<style scoped>

</style>
