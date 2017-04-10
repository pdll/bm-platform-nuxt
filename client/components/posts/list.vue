<template>
  <div id="posts_list" class="PostsList">
    <ul class="PostsList__summaries hfeed" itemScope itemType="http://schema.org/blogPosts">
      
      <li v-for="key in keys" :key="key">
        <postPreview @expand="expandPost(key)" :post="list[key]" />
      </li>
    </ul>
    
    <center v-if="loading"><LoadingIndicator type="circle" /></center>

    <postModal :opened="!!showPost" @close="closePost">
      <fullPost />
      <comments />      
    </postModal>
    
  </div>
</template>

<script>
  import fullPost from './full.vue'
  import postModal from './modal.vue'

  import userInlinePost from '../user/user-post-inline.vue'
  import comments from '../comments/list.vue'
  
  import postPreview from './short.vue'

  export default {
    methods: {
      expandPost: function (id) {
        this.showPost = id
        let route = this.$router.resolve({ name: 'user-post', params: { user: '@' + 'paperdoll', post: 444444 } })
        history.pushState('', 'New Page Title', this.$route.path + route.href)
      },
      closePost: function () {
        this.showPost = null
        history.pushState('', '', this.$route.path)
      }
    },
    data: () => ({
      showPost: null,
      //
      thumbSize: null,
      ignore: false,
      netVoteSign: false
    }),
    props: {
      category: { type: String, default: null },
      loading: { type: Boolean, default: false },
      keys: { type: Array, default: null },
      list: { type: Object, default: null }
    },
    components: { userInlinePost, postPreview, postModal, comments, fullPost }
  }
</script>
