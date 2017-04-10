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
    
    <postsList :list="posts" :keys="postKeys" />

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
    fetch ({ store }) {
      return store.dispatch('feed/fetch', { params: {} })
    },
    data: ({ route }) => {
      console.log(route.path)
      return {
        fetching: false,
        logged: true,
        bm_tasks: false,
        category: 'all',
        showSpam: false
      }
    },
    components: { postsList, replyForm, panel }
  }
</script>
