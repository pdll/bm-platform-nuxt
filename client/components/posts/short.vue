<template>

  <panel component="article" itemScope itemType ="http://schema.org/blogPost">
    <userInline slot="header" />

    <div class="task-sub-header" slot="sub-header" v-if="post.ReplyTo">
      <div class="task-sub-header__title">{{ $t('user-post.task-reply') }}</div>
      <a class="task-sub-header__link" href="#" @click.prevent="$emit('expand')">{{ post.ReplyTo.TaskPost.Post.title }}</a>
    </div>

    <div class="post-preview">
      <a class="post-preview__title" href="#" @click.prevent="$emit('expand')">{{ post.Post.title }}</a>
      <div>
        <a class="post-preview__body" href="#" @click.prevent="$emit('expand')">{{ post.Post.content }}</a>
      </div>
    </div>

    <div class="post-summary" slot="footer">
      <div class="post-summary__block_left">
        <a class="post-summary__info post-summary__info_icon post-summary__info_icon_like" data-prefix="Нравится:  " href="#"> {{ post.like_count || 0 }}</a>
        <nuxt-link v-if="post.comment_count" class="post-summary__info post-summary__info_icon post-summary__info_icon_comment" :to="{ name: 'user-post', params: { user: '@bm-paperdoll', post: 123 }, hash: '#comments' }">{{ post.comment_count }}</nuxt-link>
      </div>
      <div class="post-summary__block_right">
        <div class="post-summary__info">{{ $t('user-post.fact', { value: fact }) }}</div>
      </div>
    </div>
  </panel>
  
</template>

<script>
  import panel from '../panel'
  import numeral from 'numeral'
  import userInline from '../../components/user/inline.vue'

  export default {
    computed: {
      fact: function () { return numeral(this.post.money_fact || 0).format('0,0') }
    },
    props: {
      post: { type: Object, required: true }
    },
    components: { userInline, panel }
  }
</script>
