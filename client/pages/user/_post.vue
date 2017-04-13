<template>
  <div>
    <post />
    <comments id="comments" />
  </div>  
</template>

<script>
  import comments from '~components/comments/list.vue'
  import post from '~components/posts/full.vue'

  export default {
    components: { post, comments }
  }
</script>
