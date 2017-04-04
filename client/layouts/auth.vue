<template>
  <div class="app">
    <div class="app__content app__content_centered">
      <img src="~assets/img/logo.png" alt="Система" :style="{ display: 'block', width: '41px', height: '36px', margin: '0 auto' }" />
      <br />
      <br />

      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'

export default {
  middleware: 'restrictLogged',
  components: { MyFooter }
}
</script>
