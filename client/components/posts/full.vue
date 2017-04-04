<template>
  <div class="post-full">

    <div class="post-full__header">
      <h1 class="post-full__title">Заголовок 1</h1>
      <a class="post-full__header-info post-full__header-info_link" href="#">Юринов Степан</a>
      <span class="post-full__header-info post-full__header-info_time">вчера</span>
    </div>

    <div class="post-full__content">
      asdasdasd
    </div>

    <div class="post-full__footer">
      <div class="post-summary">
        <div class="post-summary__block post-summary__block_left">
          <a class="post-summary__info post-summary__info_icon post-summary__info_icon_like" data-prefix="Нравится " href="#">1</a>
          <a class="post-summary__info post-summary__info_icon post-summary__info_icon_comment" href="#">2</a>
        </div>
        <div class="post-summary__block post-summary__block_right">
          <a class="post-summary__link" href="#">Ответить</a>
          <div class="share">
            <div class="share__label">Поделиться: </div>
            <a class="share__icon share__icon_vk" href="#" />
            <a class="share__icon share__icon_facebook" href="#" />
            <a class="share__icon share__icon_twitter" href="#" />
          </div>
        </div>
      </div>
    </div>

  </div>

  <!--<comments />-->
</template>

<script>
  import postContent from './content.vue'

  export default {
    data: () => ({
      g: null,
      post: null,
      current_user: false,
      positiveComments: [
        { id: 123, text: 123 },
        { id: 123, text: 123 }
      ]
    }),
    components: { postContent }
  }
</script>
