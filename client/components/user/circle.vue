<template>
  <div :class="{ 'user-inline__image': true, 'user-inline__image_small': small }" @click.prevent="onClick" src="" alt="" />
</template>

<script>
  export default {
    methods: {
      onClick: function () {
        if (this.clickable) this.$emit('click')
      }
    },
    props: {
      small: { type: Boolean, default: false },
      clickable: { type: Boolean, default: false }
    }
  }
</script>
