<template>

  <panel :subHeader="{ noPadding: true }">
    <div class="panel-menu" slot="menu">
      <div class="panel-menu__item panel-menu__item_bordered" v-for="(item, key) in categories">
        <nuxt-link :class="{ 'panel-menu__link': true, 'panel-menu__link_active': key === tab }" :to="{ name: 'rating-category', params: { category: item.path || key  } }">{{ item.title }}</nuxt-link >
      </div>
    </div>

    <div class="panel-menu" v-if="subCategories" slot="sub-header">
      <div class="panel-menu__item" v-for="(item, key) in subCategories">
        <nuxt-link :class="{ 'panel-menu__link': true, 'panel-menu__link_active': key === tab }" :to="{ name: 'rating-category', params: { category: item.path || key  } }">{{ item.title }}</nuxt-link >
      </div>
      
      <div class="panel-search">
        <input class="panel-search__input" type="text" placeholder="Поиск по имени" />
      </div>
    </div>

    <div class="rating-list">

      <div class="rating-list__item" v-for="i in 6">
        <userInline :money="101701" />
      </div>

    </div>
  </panel>

</template>

<script>
  import _ from 'lodash'
  import panel from '../../components/panel'
  import User from '../../components/User.vue'
  import userInline from '../../components/user/inline.vue'

  let fakeUsers = [
    { id: 123123, last_name: 'Петров', first_name: 'Иван', name: 'ivano' },
    { id: 333333, last_name: 'Иванов', first_name: 'Петр', name: 'petro' }
  ]

  let availableCategories = {
    all: { path: 'all', title: 'Все', parent: 'all' },
    polki: { title: 'Полки' },
    polk: { title: 'Полк' },
    hundreds: { title: 'Сотни' },
    hundred: { title: 'Сотня' },
    tens: { title: 'Десятки' },
    ten: { title: 'Десятка' },
    couches: { title: 'Тренеры' },
    'couch-group': { title: 'Группы тренерства' },
    'my-ten': { title: 'Моя десятка', parent: 'all' },
    'my-group': { title: 'Моя группа', parent: 'all' },
    best: { path: 'all', title: 'Лучшие', parent: 'all' }
  }

  export default {
    layout: 'feed',
    validate ({ params }) {
      return !!availableCategories[params.category.toLowerCase()]
    },
    computed: {
      categories: () => _.pick(availableCategories, [ 'all', 'polki', 'hundreds', 'tens', 'couches' ]),
      subCategories: function () {
        let parentCategory = availableCategories[this.$route.params.category].parent

        if (parentCategory === 'all') return _.pick(availableCategories, [ 'best', 'my-ten', 'my-group' ])
        return null
      }
    },
    methods: {
      userGroupGetMoney: function (user) {
        return ''
      },
      getDescriptionByCategory: function (user, category) {
        return 'Тренерская группа ' + user.first_name + ' ' + user.last_name
      }
    },
    data: ({ params }) => {
      return {
        tab: 'all',
        users: fakeUsers
      }
    },
    components: { User, userInline, panel }
  }
</script>
