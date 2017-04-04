<template>
  <div>
    <nuxt-link :to="link" class="">{{ info.name }}</nuxt-link>
    <div class="">{{ name }}</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      link: '',
      info: {
        name: 'paperdoll'
      }
    }),
    props: {
      name: { type: String, default: null }
    }
  }
</script>
