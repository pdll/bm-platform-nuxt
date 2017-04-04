<template>
  <section class="error">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" />

    <h1 class="error__title">
      {{ error.statusCode }}
    </h1>
    <h2 class="error__info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link>
  </section>
</template>

<script>
  export default {
    props: [ 'error' ]
  }
</script>
