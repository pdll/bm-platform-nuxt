<template>
  <div>
    <panel v-for="i in 6">
      <h3 class="panel__title" slot="header">Встречи, автоворонка, план-кинжал на неделю</h3>

      <div class="post-preview__body">
        <p class="post-preview__body"><strong>Внимание!</strong> Обязательно до 6 апреля 23:59 внизу в поле «Ответить на задание» напишите о своем отдыхе и прикрепите скриншот результата работы своей автоворонки.</p>
        <br /><br />
        <p class="post-preview__body">В субботу утром на входе в зал будет проверяться статус задания. У вашего задания должен быть статус «ПРОВЕРЕНО», иначе вас не пропустят в зал до первого перерыва.</p>
      </div>

      <div class="post-summary" slot="footer">
        <div class="post-summary__block_left">
          <span class="post-summary__info" data-prefix="Срок сдачи: ">6 апреля 2017, 23:59</span>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
  export default {
    layout: 'feed',
    components: {}
  }
</script>
