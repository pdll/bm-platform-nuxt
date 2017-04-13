<template>
  <div>
    <replyForm v-if="!bm_tasks && logged" />

    <!--<HorizontalMenu :items="[]" v-if="!bm_tasks" />-->
    <panel :noBody="true" :margin="'negative'">
      <div class="panel-menu" slot="menu">
        <div class="panel-menu__item panel-menu__item_bordered" v-for="i in 3">
          <nuxt-link :class="{ 'panel-menu__link': true, 'panel-menu__link_active': i === 3 }" :to="'/'">Ссылка {{ i }}</nuxt-link >
        </div>
      </div>
    </panel>
    
    <postsList :list="feed" />

    <!--<postsList
      v-if="!bm_tasks"
      :posts="postsArray"
      :loading="fetching"
      :category="category"
      :loadMore="loadMore"
      :emptyTex="emptyText"
      :showSpam="showSpam"
    />-->
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  import panel from '../../components/panel'
  import replyForm from '../../components/reply-form.vue'
  import postsList from '../../components/posts/list.vue'

  export default {
    layout: 'feed',
    computed: {
      isCheckLinks: function () { return true },
      postsArray: function () { return [] },
      emptyText: function () { return '12312' },
      ...mapState({
        posts: state => state.feed.list,
        postKeys: state => state.feed.keys
      })
    },
    methods: {
      loadMore: function () {}
    },
    // fetch ({ store }) {
    // },
    data: ({ route, error }) => {
      return axios.get('http://localhost:3000/api/feed/list')
        .then(({ data, status }) => {
          let { feed } = data
          return {
            feed,
            fetching: false,
            logged: true,
            bm_tasks: false,
            category: 'all',
            showSpam: false
          }
        })
        .catch(err => error({ statusCode: 500, message: err.message }))
      // return {
        // fetching: false,
        // logged: true,
        // bm_tasks: false,
        // category: 'all',
        // showSpam: false
      // }
    },
    components: { postsList, replyForm, panel }
  }
</script>
