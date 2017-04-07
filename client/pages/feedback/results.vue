<template>

  <div class="feed">
    <div class="feed__left">
      <panel>
        <div class="panel-menu" slot="menu">
          <div class="panel-menu__item panel-menu__item_bordered" v-for="item in programs">
            <nuxt-link :class="{ 'panel-menu__link': true, 'panel-menu__link_active': item.code === tab }" :to="{ name: 'rating-category', params: { category: item.code  } }">{{ item.title }}</nuxt-link >
          </div>
        </div>

        <div class="nps-overall">
          <div class="nps-overall__item">
            <div class="nps-overall__value">52.6</div>
            <span class="nps-overall__title">Контент</span>
          </div>
          <div class="nps-overall__item">
            <div class="nps-overall__value">52.6</div>
            <span class="nps-overall__title">Эмоции</span>
          </div>
          <div class="nps-overall__item">
            <div class="nps-overall__value">52.6</div>
            <span class="nps-overall__title">Организация</span>
          </div>
          <div class="nps-overall__item">
            <div class="nps-overall__value">52.6</div>
            <span class="nps-overall__title">Общий</span>
          </div>
        </div>
      </panel>

      <feedbackEntry v-for="i in 3" />

      <div class="pager">
        <button class="pager__btn pager__btn_control">«</button>
        <button class="pager__btn">1</button>
        <button class="pager__btn">1</button>
        <button class="pager__btn">1</button>
        <button class="pager__dots">...</button>
        <button class="pager__btn">10</button>
        <button class="pager__btn">11</button>
        <button class="pager__btn pager__btn_control">»</button>
      </div>
    </div>
    <div class="feed__right">
      <panel>
        <ul>
          <li v-for="i in 10">
            <a href="#">{{ i }} {{ i }} {{ i }}</a>
          </li>
        </ul>
        
      </panel>
    </div>
  </div> 

</template>

<script>
  import panel from '~components/panel'
  import feedbackEntry from '~components/feedback/entry'

  export default {
    computed: {
      programs: () => ([
        { title: 'ЦЕХ', code: 'ceh' },
        { title: 'МЗС', code: 'mzs' }
      ])
    },
    data: () => ({ tab: 'ceh' }),
    components: { panel, feedbackEntry }
  }
</script>
