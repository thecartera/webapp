<template>
  <b-card title="Carteira">
    <b-table hover :items="items" />
  </b-card>
</template>

<script>
export default {
  name: 'Wallet',

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
