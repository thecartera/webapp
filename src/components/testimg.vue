<template>
  <div>
    <input type="file" @change="onFileChanged"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selectedFile: null
    }
  },

  methods: {
    onFileChanged (event) {
      const file = event.target.files[0]
      console.log(file)
    }
  }
}

</script>
