<template>
  <!-- Regarding the class binding in this b-nav-item-dropdown:
   if we're not on mobile, then the dropdown is shown in the navbar (it's not collapsed), and in that case, if we don't
   use class fixed-alignment, the dropdown button appears misaligned with the other buttons in the navbar. I bet there's
   a simple, clean solution to this, but since I'm stupid on front-end styling, this is what I came up with.
  -->
  <b-nav-item-dropdown title="Convidar amigo(a)"
                       no-caret dropleft
                       size="sm"
                       variant="primary"
                       :class="{'fixed-alignment': !isMobile}"
  >
    <b-dropdown-header v-if="!isMobile" id="dropdown-header-label">
      Convidar um amigo
    </b-dropdown-header>

    <template #button-content>
      <b-icon icon="person-plus" style="cursor: pointer" class="text-white"/>
      <span class="text-white"> Convidar</span>
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

<style scoped>
.fixed-alignment {
  padding-top: 10px;
}
</style>
