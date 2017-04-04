<template>
  <div class="app">
    <myHeader />
    <div class="app__content">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'
import myHeader from '~components/layout/header.vue'

export default {
  components: { MyFooter, myHeader }
}
</script>
