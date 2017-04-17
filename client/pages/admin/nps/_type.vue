<template>
  <div>
    <panel>
      <div class="panel-menu" slot="menu">
        <div class="panel-menu__item panel-menu__item_bordered" v-for="item in types">
          <nuxt-link :class="{ 'panel-menu__link': true, 'panel-menu__link_active': item.alias === $route.params.type }" :to="{ name: 'admin-nps-type', params: { type: item.alias } }">{{ item.title }}</nuxt-link >
        </div>
      </div>
    </panel>

    <panel></panel>
  </div>
</template>

<script>
  let npsTypes = [
    { alias: 'program', title: 'Программы' },
    { alias: 'class', title: 'Занятия' },
    { alias: 'post', title: 'Посты' },
    { alias: 'user', title: 'Пользователи' },
    { alias: 'group', title: 'Группы' }
  ]
  export default {
    computed: {
      types: () => npsTypes
    }
  }
</script>
