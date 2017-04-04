<template>
  <header class="app-header noPrint">
    <div class="app-header__wrap">

      <div class="app-header__block app-header__block_menu">
        
        <ul class="menu">
          <li class="menu__item menu__item_no_padding-left">
            <nuxt-link class="menu__link" :to="'/'">
              <img src="~assets/img/logo.png" alt="Система" :style="{ display: 'inline-block', width: '41px', height: '36px' }" />
            </nuxt-link>
          </li>

          <li class="menu__item">
            <nuxt-link class="menu__link" :to="{ name: 'feed', params: { category: 'hot' } }">{{ $t('layout.menu.reports' ) }}</nuxt-link>
          </li>
          
          <li class="menu__item" v-if="$store.state.user.logged">
            <nuxt-link class="menu__link" :to="{ name: 'tasks' }">{{ $t('layout.menu.tasks' ) }}</nuxt-link>
          </li>

          <li class="menu__item">
            <nuxt-link class="menu__link" :to="{ name: 'rating', params: { category: 'all' } }">{{ $t('layout.menu.ratings' ) }}</nuxt-link>
          </li>    
        </ul>
      </div>

      <div class="app-header__block app-header__block_menu">
        <headerRight />
      </div>
      
    </div>
  </header>
</template>

<script>
  import headerRight from './headerRight.vue'

  export default {
    components: { headerRight }
  }
</script>
