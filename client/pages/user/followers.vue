<template>
  <userLayout>
    <div class="panel">
      <div class="panel__header">
        <h3 class="panel__title">Подписки</h3>
      </div>

      <div class="panel__body panel__body_no_horizontal-padding  panel__body_no_vertical-padding">

        <div class="followers-list">
          <div class="followers-list__item" v-for="i in 6">
            <userInline :subscribeButtons="true" />
          </div>
        </div>

      </div>

      <div class="panel__footer">
        <div class="panel-pager">
          <div class="panel-pager__btn panel-pager__btn_left">
            <button class="myBtn myBtn_thin myBtn_hollow" :disabled="true">Предудыщая</button>
          </div>
          <div class="panel-pager__btn panel-pager__btn_right">
            <button class="myBtn myBtn_thin myBtn_hollow">Следующая</button>
          </div>
        </div>
      </div>

    </div>
  </userLayout>
</template>

<script>
  import userLayout from '../../components/user/layout.vue'
  import userInline from '../../components/user/inline.vue'

  export default {
    layout: 'user',
    components: { userLayout, userInline }
  }
</script>
