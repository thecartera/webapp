<template>
  <b-nav-item-dropdown title="Convidar amigo(a)"
                       no-caret dropleft
                       size="sm"
                       variant="primary">
    <b-dropdown-header v-if="!isMobile" id="dropdown-header-label">
      Convide um amigo
    </b-dropdown-header>

    <template #button-content>
      <b-icon icon="person-plus" style="cursor: pointer" class="text-white"/>
      <span v-if="isMobile" class="text-white"> Convidar amigo(a)</span>
    </template>

    <Socials :url="`https://cartera.com.br`" />
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
