<template>
<!-- if want to use the entire screen, change "container" to "container-fluid" -->
<!-- px-0 is used to take advantage of the full width (no margins/padding) of the screen -->
  <div class="container-fluid px-0" style="overflow-x: hidden">
      <router-view />
  </div>
</template>
