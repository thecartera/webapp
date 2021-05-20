<template>
  <div>
    <Navbar />
    <Feed style="min-height: 60rem"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Feed from '@/components/Feed'

export default {
  name: 'FeedView',

  components: {
    Navbar,
    Feed
  }
}
</script>
