<template>
  <userLayout>
    <div class="user-blog">
      
      <replyForm />

      <div class="user-blog__content">

        <postPreview v-for="i in 6" />

      </div>
    </div>
  </userLayout>
</template>

<script>
  import userLayout from '../../components/user/layout.vue'
  import replyForm from '../../components/reply-form.vue'
  import postPreview from '../../components/posts/short.vue'

  export default {
    layout: 'user',
    validate ({ params }) { return /^@bm-[\w.\d-]+$/.test(params.user) },
    components: { userLayout, postPreview, replyForm }
  }
</script>
