<template>
  <div :class="{ 'rating-bar': true, 'rating-bar_inline': inline }">
    <span class="rating-star" v-for="i in maxRate">&#10027;</span>
  </div>
</template>

<script>
  export default {
    props: {
      maxRate: { type: Number, default: 10 },
      inline: { type: Boolean, default: false }
    }
  }
</script>
