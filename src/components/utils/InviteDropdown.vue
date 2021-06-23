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
      message: 'Você recebeu um convite para fazer parte do Cartera. Crie' +
          ' uma conta e vem ver no que seus amigos estão investindo!'
    }
  }
}

</script>
