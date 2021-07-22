<template>
  <!-- pt-2 is needed here because alignment of the items in the navbar is messed up -->
  <b-nav-item-dropdown
    title="Convidar amigo(a)"
    no-caret
    right
    size="sm"
    variant="primary"
    class="pt-0"
  >
    <b-dropdown-header id="dropdown-header-label">
      Convidar amigos
    </b-dropdown-header>

    <template #button-content>
      <b-row align-h="center" class="m-0 p-0">
        <b-col class="m-0 p-0" cols="auto">
          <b-icon scale="1.3" shift-v="-7" icon="person-plus" style="cursor: pointer" class="text-white"/>
        </b-col>
        <b-col class="m-0 pt-2 pl-2" cols="auto">
          <span class="text-dark mt-2 pt-2 text-white">
            Convidar amigos
          </span>
        </b-col>
      </b-row>
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
