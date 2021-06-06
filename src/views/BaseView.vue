<template>
<div class="d-flex flex-column justify-content-between">
  <div class="d-flex justify-content-between h-100 p-0">
    <div class="d-none d-md-block col-md-3">
      <slot name="left"></slot>
    </div>

    <div class="col-12 col-md-6">
      <slot></slot>
    </div>

    <div class="d-none d-md-block col-md-3">
      <slot name="right"></slot>
    </div>
  </div>
</div>
</template>
