<template>
  <div class="row justify-content-center">
    <b-card
      title="Login"
      img-src="https://cdn.discordapp.com/attachments/750789539890462842/826320661496070144/pexels-gustavo-fring-3874041.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 30rem;min-width: 30rem"
    >
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Seu email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Digite seu email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Sua senha" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.pass"
            placeholder="Digite sua senha"
            required
          ></b-form-input>
          <a style="font-size:0.8rem" href="#" class="card-link">Esqueceu sua senha?</a>
          <br>
          <a style="font-size:0.8rem" href="#/register" class="card-link">Criar conta</a>
        </b-form-group>
        <div class="row justify-content-around">
          <b-button type="submit" variant="info" pill>Entrar</b-button>
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
        pass: ''
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>
