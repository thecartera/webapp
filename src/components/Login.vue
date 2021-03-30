<template>
  <div class="row justify-content-center">
    <b-card
      img-src="https://cdn.discordapp.com/attachments/750789539890462842/826320661496070144/pexels-gustavo-fring-3874041.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 30rem;min-width: 30rem"
    >
      <b-form @submit="onSubmit">

        <!-- EMAIL INPUT -->
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="email"
            required
            style="font-size:1.1rem"
          ></b-form-input>
        </b-form-group>

        <!-- PASSWORD INPUT -->
        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.pass"
            placeholder="senha"
            required
            style="font-size:1.1rem"
          ></b-form-input>
        </b-form-group>

        <!-- LOG IN -->
        <div class="row justify-content-center">
          <div style="width: 93%">
            <b-button style="font-size:1.3rem" block type="submit" variant="info">Entrar</b-button>
          </div>
        </div>

        <p></p>

        <!-- FORGOT PASSWORD -->
        <div class="row justify-content-center">
          <a style="font-size:0.9rem" href="#" class="card-link">Esqueceu sua senha?</a>
        </div>

        <hr>

        <!-- CREATE NEW ACCOUNT -->
        <div class="row justify-content-center">
          <b-button style="font-size:1.2rem" href="#/register" variant="success">Criar nova conta</b-button>
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
