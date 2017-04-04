<template>

  <panel component="article" itemScope itemType ="http://schema.org/blogPost">
    <userInline slot="header" />
    
    <div class="task-sub-header" slot="sub-header">
      <div class="task-sub-header__title">Выполнение задания</div>
      <a class="task-sub-header__link" href="#" @click.prevent="$emit('expand')">1000 посетителей, 100 репостов, лид-магнит и план-кинжал</a>
    </div>

    <div class="post-preview">
      <a class="post-preview__title" href="#" @click.prevent="$emit('expand')">{{ title }}</a>
      <a class="post-preview__body" href="#" @click.prevent="$emit('expand')">Пыталась по честному сделать задание, с 1000 посещений сайта и 100 скачиваний лид-магнита.</a>
    </div>

    <div class="post-summary" slot="footer">
      <div class="post-summary__block_left">
        <a class="post-summary__info post-summary__info_icon post-summary__info_icon_like" data-prefix="Нравится " href="#">1</a>
        <nuxt-link class="post-summary__info post-summary__info_icon post-summary__info_icon_comment" :to="{ name: 'user-post', params: { user: '@bm-paperdoll', post: 123 }, hash: '#comments' }">2</nuxt-link>
      </div>
      <div class="post-summary__block_right">
        <div class="post-summary__info">Факт дня: 100 000 руб</div>
      </div>
    </div>
  </panel>
  
</template>

<script>
  import panel from '../panel'
  import userInline from '../../components/user/inline.vue'

  export default {
    props: {
      title: { type: String, default: null }
    },
    components: { userInline, panel }
  }
</script>
