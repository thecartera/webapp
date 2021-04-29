<template>
  <div class="container-fluid p-0 overflow">
    <div
      id="content-1"
      class="p-3 py-5 p-md-5 mx-auto d-flex align-items-center justify-content-center"
    >
      <div class="row container-md">
        <div
          class="col-12 col-md-6 d-flex d-md-none mb-4 p-0 justify-content-center"
        >
          <img
            class="img-mockups"
            src="@/assets/landing-mockup.png"
            alt="..."
            width="360"
            height="247"
          />
        </div>
        <div class="col-12 col-md-6 px-md-5">
          <div class="title mb-4">
            <p
              class="h1 font-weight-normal text-center text-md-left d-flex d-md-none"
            >
              Veja e acompanhe as carteiras de ações dos seus amigos
            </p>
            <p
              class="display-4 font-weight-normal text-center text-md-left d-none d-md-flex"
            >
              Veja e acompanhe as carteiras de ações dos seus amigos
            </p>
          </div>
          <div class="sub-title mb-4 pr-md-5 text-grey">
            <p class="lead text-center text-md-left">
              Monneda é uma rede social para interações entre
              investidores, seus portfolios e notícias.
            </p>
          </div>
          <div class="sub-btn text-center text-md-left">
            <b-button class="custom-btn px-4" size="lg">
              Começar a usar
            </b-button>
          </div>
        </div>
        <div class="col-12 col-md-6 d-none d-md-flex">
          <img class="img-mockups" src="@/assets/landing-mockup.png" width="600" height="411" alt="..." />
        </div>
      </div>
    </div>

    <div
      id="content-2"
      class="p-3 py-5 p-md-5 mx-auto d-block d-flex align-items-center justify-content-center"
    >
      <div class="px-md-5 container-md">
        <div class="row mb-5">
          <div class="col-12 col-md-6">
            <div class="title mb-4">
              <p class="h1 font-weight-normal text-center text-md-left">
                Por que entrar na Monneda?
              </p>
            </div>
            <div class="sub-title text-grey">
              <p class="lead text-center text-md-left">
                Assim você está sempre por dentro do que seus amigos estão
                investindo e podem discutir os melhores ativos do momento.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 col-md-3 mb-5 mb-md-0"
            v-for="item in content"
            :key="item.title"
          >
            <div class="icon mb-4 text-center text-md-left row justify-content-center">
              <b-avatar class="custom-btn" style="width: 3rem; height: 3rem">
                <b-icon :icon="item.icon" scale="2"> </b-icon>
              </b-avatar>
            </div>
            <div class="title mb-4">
              <p class="h3 font-weight-normal text-center">
                {{ item.title }}
              </p>
            </div>

            <div class="sub-title text-grey text-center">
              <p class="h5 font-weight-light">
                {{ item.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: [
        {
          icon: 'people-fill',
          title: 'Interaja',
          subtitle:
            'Saiba que um amigo mudou sua posição e comente, curta ou indique "bear" ou "bull".'
        },
        {
          icon: 'chat-dots-fill',
          title: 'Fique por dentro',
          subtitle:
            'Veja as carteiras mais rentáveis do mês e as notícias impactantes do mercado. '
        },
        {
          icon: 'cash-stack',
          title: 'Invista melhor',
          subtitle:
            'Agora que você sabe no que outros estão investindo e como estão performando.'
        },
        {
          icon: 'shield-fill-check',
          title: 'Não se preocupe',
          subtitle:
            'Apenas você pode ver o valor da sua carteira. Seus amigos só veem a composição em %.'
        }
      ],
      Llinks: [
        {
          name: 'Sobre',
          href: '#'
        },
        {
          name: 'Contato',
          href: '#'
        }
      ],
      Rlinks: [
        {
          name: 'Vagas',
          href: '#'
        },
        {
          name: 'Termos de uso',
          href: '#'
        }
      ]
    }
  }
}
</script>

<style scoped>
.text-grey {
  color: grey;
}

.overflow {
  overflow-x: hidden;
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

/* Small devices (mobile & Tablet, 768px and below) */
@media only screen and (max-width: 768px) {
  #content-1 {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: #fcfcfc;
    background-image: url(../assets/bg-intro-mobile.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center top;
  }

  #content-2 {
    min-height: 100vh;
    background-color: #f4f5f6;
  }
}

/* Medium devices (desktops, 769px and up) */
@media only screen and (min-width: 769px) {
  #content-1 {
    margin: 0;
    padding: 0;
    min-height: 60vh;
    background-color: #fcfcfc;
    background-image: url(../assets/bg-intro-desktop.svg);
    background-size: 92%;
    background-repeat: no-repeat;
    background-position: 550% 50%;
  }

  #content-2 {
    margin: 0;
    padding: 0;
    min-height: 60vh;
    background-color: #f4f5f6;
  }

  .img-mockups {
    position: absolute;
    width: 390px;
    height: 220px;
    left: 0%;
    bottom: 40%;
  }
}

/* Large devices (desktops, 769px and up) */
@media only screen and (min-width: 992px) {
  #content-1 {
    margin: 0;
    padding: 0;
    min-height: 60vh;
    background-color: #fcfcfc;
    background-image: url(../assets/bg-intro-desktop.svg);
    background-size: 93%;
    background-repeat: no-repeat;
    background-position: 550% 50%;
  }

  #content-2 {
    margin: 0;
    padding: 0;
    min-height: 60vh;
    background-color: #f4f5f6;
  }

  .img-mockups {
    position: absolute;
    left: -15%;
    bottom: 30%;
    width: 600px;
    height: 360px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  #content-1 {
    margin: 0;
    padding: 0;
    min-height: 90vh;
    background-color: #fcfcfc;
    background-image: url(../assets/bg-intro-desktop.svg);
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: 400% 50%;
  }

  #content-2 {
    margin: 0;
    padding: 0;
    min-height: 70vh;
    background-color: #f4f5f6;
  }

  .img-mockups {
    position: absolute;
    left: -5%;
    bottom: 20%;
    z-index: 0;
  }
}

/* 2K devices (2K desktops, 1920px and up) */
@media only screen and (min-width: 1920px) {
  #content-1 {
    margin: 0;
    padding: 0;
    min-height: 95vh;
    background-color: #fcfcfc;
    background-image: url(../assets/bg-intro-desktop.svg);
    background-size: 91%;
    background-repeat: no-repeat;
    background-position: 450% 50%;
  }

  #content-2 {
    margin: 0;
    padding: 0;
    min-height: 75vh;
    background-color: #f4f5f6;
  }

  .img-mockups {
    position: absolute;
    left: 5%;
    bottom: -105%;
  }
}
</style>
