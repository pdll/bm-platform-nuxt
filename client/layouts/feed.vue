<template>
  <div class="app">
    <myHeader />
    <div class="app__content">
      <div class="feed">
        <div class="feed__left">
          <nuxt/>
        </div>
        <div class="feed__right">
          <panel>Content here</panel>
          <panel>Content here</panel>
          <panel>Content here</panel>
          
          <!--<TaskCheckLinks v-if="isCheckLinks" />
          <Beta />
          <CardMyTen />-->
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
  import panel from '~components/panel'
  import MyFooter from '~components/Footer.vue'
  import myHeader from '~components/layout/header.vue'

  export default {
    components: { MyFooter, myHeader, panel }
  }
</script>
