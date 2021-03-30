<template>
  <div class="row justify-content-center">
    <b-card
      title="Criar conta"
      tag="account"
      style="max-width: 30rem;min-width: 30rem"
    >
    <b-form @submit="onSubmit">

      <!-- EMAIL -->
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-input-group>
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            oninvalid="this.setCustomValidity('Por favor digite um email válido')"
            oninput="setCustomValidity('')"
            @keypress="validEmail($event)"
            placeholder="Digite seu email"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <!-- USER -->
      <b-form-group
        id="input-group-2"
        label="Usuário"
        label-for="input-2">
        <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="input-2"
          v-model="form.username"
          placeholder="Registre seu user"
          oninvalid="this.setCustomValidity('Por favor digite um usuário válido')"
          oninput="setCustomValidity('')"
          @keypress="validUsernameKey($event)"
          required
          trim
        ></b-form-input>
        </b-input-group>
      </b-form-group>

      <!-- GENDER -->
      <b-form-group id="input-group-3" label="Gênero:" label-for="input-3">
        <b-form-select
          oninvalid="this.setCustomValidity('Por favor selecione uma opção')"
          oninput="setCustomValidity('')"
          id="input-3"
          v-model="form.gender"
          :options="genders"
          required
        ></b-form-select>
      </b-form-group>

      <!-- BIRTHDAY -->
      <b-form-group id="input-group-1" label="Data de nascimento" label-for="input-1">
        <b-input-group>
          <b-form-input
            id="input-1"
            v-model="form.birthday"
            type="date"
            oninvalid="this.setCustomValidity('Por favor digite uma data válida')"
            oninput="setCustomValidity('')"
            placeholder="Digite a sua data de nascimento"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <!-- TERMS OF USE -->
      <b-form-group id="input-group-4" :state="isTermsOfUseChecked">
        <b-form-checkbox
        required
        v-model="form.termsOfUseChecked"
        id="checkboxes-4"
        :value=invertTermsOfUseCheck
        >
          Li e concordo com os <a href="#" class="card-link">Termos de Uso</a>
        </b-form-checkbox>
        <b-form-invalid-feedback :state="isTermsOfUseChecked">Por favor aceite os termos</b-form-invalid-feedback>
        <b-form-valid-feedback :state="isTermsOfUseChecked">Obrigado</b-form-valid-feedback>
      </b-form-group>

      <!-- SUBMIT -->
      <div class="text-center">
        <b-button type="submit" variant="info" pill>Criar conta</b-button>
      </div>
    </b-form>
    <!-- used to DEBUG
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    -->
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        username: '',
        gender: null,
        termsOfUseChecked: null,
        birthday: null
      },
      genders: [{ text: 'Selecione um', value: null }, 'Feminino', 'Masculino', 'Não Binário', 'Prefiro não dizer']
    }
  },

  computed: {
    invertTermsOfUseCheck () {
      if (this.form.termsOfUseChecked === null) {
        return true
      }
      return !this.form.termsOfUseChecked
    },
    isTermsOfUseChecked () {
      return this.form.termsOfUseChecked
    }
  },

  methods: {
    onSubmit (event) {
      if (this.allInputsAreValid()) {
        // event.preventDefault()
        alert(JSON.stringify(this.form))
      } else {
        event.preventDefault()
      }
    },

    validEmail (evt) {
      if (this.form.email.length < 40) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    validUsernameKey (evt) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const cLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      const key = evt.key
      if ((letters.includes(key) || cLetters.includes(key) || key in numbers) && this.form.username.length < 20) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    validUsername () {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      const cLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (const key of this.form.username) {
        if ((letters.includes(key) || cLetters.includes(key) || key in numbers) && this.form.username.length < 20) {
          return true
        } else {
          return false
        }
      }
    },

    allInputsAreValid () {
      // valid email?
      if (this.form.email.length > 40) {
        console.log('error: invalid email')
        return false
      }
      // valid username?
      if (!this.validUsername() && this.form.username.length >= 4) {
        console.log('error: invalid username')
        return false
      }
      // selected gender?
      const genders = ['Feminino', 'Masculino', 'Não Binário', 'Prefiro não dizer']
      if (!genders.includes(this.form.gender)) {
        console.log('error: gender not selected')
        return false
      }
      // is old enough?
      if (this.form.birthday.split('-')[0] > 2002) {
        console.log('error: sorry, you are too young')
        return false
      }
      // checked terms of use?
      if (!this.form.termsOfUseChecked) {
        console.log('error: terms of service choice not read')
        return false
      }
      return true
    }
  }
}
</script>
