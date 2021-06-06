<template>
<div class="d-flex flex-column justify-content-between vh-100">
  <Navbar v-if="navbar"/>

  <div class="d-flex justify-content-between h-100 p-0">
    <div class="d-none d-md-block col-0 col-md-3">
      <slot name="left"></slot>
    </div>

    <div class="col-12 col-md-6">
      <slot></slot>
    </div>

    <div class="d-none d-md-block col-0 col-md-3">
      <slot name="right"></slot>
    </div>
  </div>

  <Footer v-if="footer" class="align-self-end" />
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  },

  props: {
    footer: {
      type: Boolean,
      default: false
    },
    navbar: {
      type: Boolean,
      default: false
    }
  }
}
</script>
