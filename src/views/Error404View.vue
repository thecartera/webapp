<template>
  <div>
    <FollowsNavbar />

    <ThreeColumnsLayout>
      <b-card title="Página não encontrada">
        Clique <b-link to="/">aqui</b-link> para retornar ao feed
      </b-card>
    </ThreeColumnsLayout>
  </div>
</template>

<script>
import FollowsNavbar from '@/components/navbars/FollowsNavbar'
import ThreeColumnsLayout from '@/components/layout/ThreeColumnsLayout'

export default {
  name: 'Error404View',
  components: {
    ThreeColumnsLayout,
    FollowsNavbar
  }
}
</script>
