<template>
<b-container class="p-0">
  <b-card no-body class="px-4 py-2">
    <b-row>
      <b-col class="p-0" cols="auto" align-self="start">
        <b-avatar
          size="3rem"
          :src="logged_user.picture"
        />
      </b-col>
      <b-col class="mr-0 ml-2" align-self="center">
        <b-row>
          <b-input-group>
            <!--
              The "overflow:auto" is needed to only show scroll when needed
              The ":max-rows" works beause without the : Vue will strip
              everything so that the prop is only a string hence the newline
              character will not work.
            -->
            <b-form-textarea
              style="overflow:auto"
              size="md"
              placeholder="No que você está pensando?"
              :value="postLen > 0 ? postText : ''"
              :max-rows="5"
              @update="updateText"
            />
          </b-input-group>
        </b-row>
        <b-row v-if="picURL" style="background-color: #f3f2ef;">
          <b-img
            thumbnail
            center
            :src="picURL"
            style="max-width: 100%; max-height: 25rem; z-index: 1"
          >
          </b-img>
          <b-button
            class="ml-2 mt-2"
            style="z-index: 2; position: absolute; opacity: 0.5"
            variant="secondary"
            @click="picURL=''"
          >
            <b-icon scale="1.3" icon="x-circle"></b-icon>
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="end" class="pt-2">
      <b-col cols="auto" v-if="postLen > 630">
        <span :class="postLen > maxLenInChars ? 'text-danger font-weight-bold' : ''">
          {{ `${postLen}/${maxLenInChars}` }}
        </span>
      </b-col>
      <b-col cols="auto">
        <b-button size="sm" variant="white" pill class="mb-2" @click="showAddImageModal">
          <b-icon icon="image" ></b-icon>
        </b-button>
        <AddImage ref="addImageModal" @updateImage="updateImage"/>
      </b-col>
      <b-col cols="auto" class="p-0">
        <b-button
          size="sm"
          variant="primary"
          :disabled="postLen > maxLenInChars"
          @click="postPost"
        >
          Publicar
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</b-container>
</template>

<script>
import client from '@/commons/client.api'
import AddImage from '@/components/posts/AddImage'

export default {
  name: 'WritePost',

  components: {
    AddImage
  },

  data: () => ({
    postText: '',
    maxLenInChars: 840,
    picURL: ''
  }),

  computed: {
    logged_user () {
      return this.$store.state.auth.user
    },
    postLen () {
      return this.postText.length
    }
  },

  methods: {
    updateText (event) {
      this.postText = event
      // kLINK_DETECTION_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
    },
    async postPost () {
      try {
        const newPost = await client.posts.postPost(this.postText, this.picURL)
        this.postText = ''
        this.picURL = ''
        this.$emit('new-post', newPost)
      } catch (e) {
        console.error(e)
      }
    },
    showAddImageModal () {
      this.$refs.addImageModal.show(this.picURL)
    },
    updateImage (event) {
      this.picURL = event
    }
  },

  async mounted () {
    const suggestions = await client.users.getSuggestedFriends(30)
    this.suggestedUsers = suggestions.sort(() => 0.5 - Math.random())
  }
}

</script>
