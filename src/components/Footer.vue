<template>
   <div class="container-fluid p-0">
    <footer class="p-0 custom-footer d-flex align-items-center justify-content-center">
      <div class="p-3 py-5 px-md-5 mx-auto container-md">
        <div class="px-2 px-md-0 my-4">
          <div class="row">
            <div class="col-12 col-md-3 mb-4 mb-md-0 text-center text-md-left">
              <div class="mb-4 mb-md-5">
                <img src="@/assets/logo512x512.png" width="50" alt="..." />
              </div>
            </div>
            <div class="col-12 col-md-3 text-center text-md-left">
              <div
                class="d-block mb-2"
                v-for="link in Llinks"
                :key="link.name"
              >
                <a class="link-style" :href="link.href"> {{ link.name }} </a>
              </div>
            </div>
            <div class="col-12 col-md-3 text-center text-md-left">
              <div
                class="d-block mb-2"
                v-for="link in Rlinks"
                :key="link.name"
              >
                <a class="link-style" :href="link.href"> {{ link.name }} </a>
              </div>
            </div>
            <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <div class="mb-4">
                <b-icon icon="envelope-fill" variant="light" />
                <a href="mailto:monnedanetwork@gmail.com" class="link-style">
                  Enviar email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
   </div>
</template>

<script>
export default {
  data () {
    return {
      Llinks: [
        {
          name: 'Dúvida ou sugestão?',
          href: 'https://forms.gle/9TBhQtpSSAzwfjQe7'
        },
        {
          name: 'Relatar bug ou erro',
          href: 'https://forms.gle/9TBhQtpSSAzwfjQe7'
        }
      ],
      Rlinks: [
        {
          name: 'Política de privacidade',
          href: '#/privacy_policy'
        },
        {
          name: 'Termos de uso',
          href: '#/terms_of_service'
        }
      ]
    }
  }
}
</script>

<style scoped>

.overflow {
  overflow-x: hidden;
}

.custom-footer {
  background-color: #2c2f4b;
  padding: 1rem 2rem;
  min-height: 10rem;
}

.link-style {
  color: white;
  font-weight: 400;
  text-decoration: none;
}
.link-style:hover {
  color: white;
  font-weight: 600;
  text-decoration: none;
  text-decoration: underline;
}

.custom-btn {
  background-image: linear-gradient(to right, #31d35c, #2bb7da);
  border-radius: 2rem;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.custom-btn:hover {
  background-image: linear-gradient(to right, #27a84a, #2089a3);
  border-radius: 50px;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

</style>
