<template>
  <!--<transition name="modal-fade">-->
    <div class="post-modal" v-if="opened" @click.self="$emit('close')">
      <div class="post-modal__top" @click.stop="$emit('close')" />

      <div class="post-modal__content">
        <slot />
      </div>

      <button class="post-modal__control post-modal__control_left"><</button>
      <button class="post-modal__control post-modal__control_right">></button>
    </div>
  <!--</transition>-->
</template>

<script>
  export default {
    watch: {
      opened: function () {
        if (this.opened) document.body.className += ' noscroll'
        else document.body.className = document.body.className.replace('noscroll', '')
      }
    },
    mounted: function () {
      document.body.append(this.$el)
    },
    destroy: function () {
      this.$el.remove()
      document.body.class = document.body.class.replace('noscroll', '')
    },
    props: {
      opened: { type: Boolean, default: false }
    }
  }
</script>
