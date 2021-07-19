<template>
  <!-- pt-2 is needed here because alignment of the items in the navbar is messed up -->
  <b-nav-item-dropdown title="Convidar amigo(a)"
                       no-caret dropleft
                       size="sm"
                       variant="primary"
                       class="pt-2"
  >
    <b-dropdown-header id="dropdown-header-label">
      Convidar um amigo
    </b-dropdown-header>

    <template #button-content>
      <b-icon icon="person-plus" style="cursor: pointer" class="text-white"/>
      <span class="text-white"> Convidar</span>
    </template>

    <Socials :title="message" :url="`https://cartera.com.br`" />
  </b-nav-item-dropdown>
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
  },
  computed: {
    isMobile () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  }
}
</script>
