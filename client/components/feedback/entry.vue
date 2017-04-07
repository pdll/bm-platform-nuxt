<template>
  <panel component="article">
    <userInline slot="header" :time="null" />

    <div class="post-preview">
      <a class="post-preview__body">Пыталась по честному сделать задание, с 1000 посещений сайта и 100 скачиваний лид-магнита.</a>
    </div>

    <div class="nps-result" slot="footer">
      <div class="nps-result__row">
        <div class="nps-result__row-title">Качество контента: </div>
        <rateBar class="nps-result__row-value" :inline="true" />
      </div>
      <div class="nps-result__row">
        <div class="nps-result__row-title">Эмоции: </div>
        <rateBar class="nps-result__row-value" :inline="true" />
      </div>
      <div class="nps-result__row">
        <div class="nps-result__row-title">Организация: </div>
        <rateBar class="nps-result__row-value" :inline="true" />
      </div>
    </div>
  </panel>
</template>

<script>
  import rateBar from '~components/rating/bar'
  import panel from '~components/panel'
  import userInline from '~components/user/inline'

  export default {
    components: { panel, userInline, rateBar }
  }
</script>
