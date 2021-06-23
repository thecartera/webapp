<template>
<b-dropdown
  no-caret
  size="sm"
  variant="primary"
  style="height:43px"
  right
>
  <template #button-content>
    <b-icon
      icon="person-plus"
      scale="1"
      style="cursor: pointer"
      variant="dark"
    />
  </template>

  <Socials :title="message" :url="`https://cartera.com.br`" />

</b-dropdown>
</template>

<script>
import Socials from '@/components/utils/Socials'

export default {
  name: 'InviteDropdown',
  components: {
    Socials
  },
  data: () => {
    return {
      message: 'Você recebeu um convite para fazer parte do Cartera. Veja as carteiras de investimento de seus amigos, saiba quando eles fazem movimentações e conheça sua estratégia.'
    }
  }
}

</script>
