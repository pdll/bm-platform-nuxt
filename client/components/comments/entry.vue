<template>
  <div class="comment">
    <div class="comment__header">
      <userInline />
    </div>

    <div class="comment__body" v-if="!collapsed">
      <p>Такая же фигня недавно была...... застой он бывает, мало того всё бесит и всё не то и не так!! Но..... всезда заканчивается ночь и наступает утро)))</p>
    </div>

    <div class="comment__footer">
      <div class="post-summary">
        <div class="post-summary__block_left">
          <a class="post-summary__info post-summary__info_icon post-summary__info_icon_like" data-prefix="Нравится " href="#">1</a>
          <a class="post-summary__info post-summary__info_icon post-summary__info_icon_comment" href="#">2</a>
        </div>
        <div class="post-summary__block_right" />
      </div>
    </div>
  </div>
</template>

<script>
  import userInline from '../user/inline.vue'

  export default {
    props: {
      collapsed: { type: Boolean, default: false }
    },
    components: { userInline }
  }
</script>
