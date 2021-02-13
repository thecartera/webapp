<template>
  <div id="app">
    <b-navbar sticky variant="info">
      <b-navbar-brand href="#"> Monneda </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item href="#"> Feed </b-nav-item>
        <b-nav-item href="#"> Rede </b-nav-item>
        <b-nav-item href="#"> Eventos </b-nav-item>
        <b-nav-item href="#"> Chat </b-nav-item>
        <b-nav-item href="#"> Notificações </b-nav-item>
        <b-nav-item href="#"> Hashtags </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" placeholder="Pesquisa"></b-form-input>
          <b-button size="sm"> Search </b-button>
        </b-nav-form>
        <b-nav-item href="#"> Perfil </b-nav-item>
        <b-nav-item href="#"> Carteiras </b-nav-item>
        <b-nav-item href="#"> Opções </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col cols="8">

          <b-card>
            <b-row>
              <b-col cols="3" align-self="center">
                <b-avatar
                  src="https://placekitten.com/300/300"
                  size="6rem"
                />
              </b-col>

              <b-col cols="8" class="text-left">
                <b-card-body>
                  <b-card-title> Guilherme Dantas </b-card-title>
                  <b-card-sub-title> Interessado em mercado de capitais, política e finanças públicas </b-card-sub-title>

                  <b-row>
                    <b-col> 3.2% Retorno hoje </b-col>
                    <b-col> 33 seguindo </b-col>
                    <b-col> 1200 seguidores </b-col>
                  </b-row>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <hr>

          <b-card title="Carteira">
            <b-table hover :items="items" />
          </b-card>

        </b-col>
        <b-col cols="4">
          <section> Side bar </section>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    items: [
      { code: 'AAPL34', name: 'Apple DBR', position: 5.3, monthly: 4.4 },
      { code: 'BBAS3', name: 'Banco do Brasil', position: 7.5, monthly: 3.8 },
      { code: 'PIBB11', name: 'ETF B3', position: 12.5, monthly: 3.6 },
      { code: 'VVAR3', name: 'Via Varejo', position: 5.3, monthly: 3.4 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'BPAC11', name: 'Banco Pactual', position: 7.5, monthly: 2.8 },
      { code: 'CPLE6', name: 'Copel Energia', position: 1.4, monthly: 2.4 }
    ]
  })
}
</script>

<style>
</style>
