<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <NewPost />
        <hr>
        <FeedItem />
        <p/>
        <FeedItem />
        <p/>
        <FeedItem />
        <p/>
        <FeedItem />
      </b-col>

      <b-col cols="4">
        <section> Side bar </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NewPost from '@/components/NewPost'
import FeedItem from '@/components/FeedItem'

export default {
  name: 'FeedView',
  components: { NewPost, FeedItem }
}
</script>
