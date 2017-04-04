<template>
  <ul class="user-menu">
    <li class='user-menu__item user-menu__item_no_padding' v-if="$store.state.user.logged">
      <nuxt-link class="user-menu__link user-menu__link_icon user-menu__link_icon_like" :to="{ name: 'user-transfers', params: { user: '@bm-paperdoll' } }">5</nuxt-link>
    </li>

    <li class="user-menu__item user-menu__item_no_padding" v-if="vertical">
      <a class="user-menu__link user-menu__link_icon user-menu__link_icon_search" :href="$router.resolve({ name: 'account-create' }).href" @click.prevent="" />
    </li>
    
    <template v-if="!$store.state.user.logged">

      <li class='user-menu__item user-menu__item_hoverable'>
        <a class="user-menu__link" :href="$router.resolve({ name: 'account-create' }).href" @click.prevent="modal.sign_up = true">{{ $t('layout.side_menu.sign_up') }}</a>
      </li>

      <li class='user-menu__item user-menu__item_hoverable'>
        <a class="user-menu__link" :href="$router.resolve({ name: 'account-auth' }).href" @click.prevent="modal.login = true">{{ $t('layout.side_menu.login') }}</a>
      </li>

    </template>

    <li class='user-menu__item user-menu__item_padded' v-if="$store.state.user.logged">
      <userImage :small="true" :clickable="true" @click="openMenu" />
      
      <ul class="user-sub-menu" v-if="menu.profile">
        <li class="user-sub-menu__item">
          <nuxt-link class="user-sub-menu__link" :to="{ name: 'user', params: { user: '@bm-paperdoll' } }">{{ $t('layout.user_menu.profile') }}</nuxt-link>
        </li>
        <li class="user-sub-menu__item">
          <a class="user-sub-menu__link" href="#">{{ $t('layout.user_menu.responses') }}</a>
        </li>
        <li class="user-sub-menu__item">
          <nuxt-link class="user-sub-menu__link" :to="{ name: 'user-settings', params: { user: '@bm-paperdoll' } }">{{ $t('layout.user_menu.settings') }}</nuxt-link>
        </li>
        <li class="user-sub-menu__item">
          <a class="user-sub-menu__link" @click.prevent="$store.commit('user/log_out')">{{ $t('layout.user_menu.logout') }}</a>
        </li>
      </ul>
    </li>

    <modal :opened="modal.login" @onClose="modal.login = false" width="400px">
      <loginForm @onAfterSuccess="modal.login = false" />
    </modal>

    <modal :opened="modal.sign_up" @onClose="modal.sign_up = false" width="400px">
      <signUpForm />
    </modal>
  </ul>
</template>

<script>
  import userImage from '../user/circle.vue'
  import dropdownMenu from '../verticalMenu.vue'
  import loginForm from '../auth/login.vue'
  import signUpForm from '../auth/sign_up.vue'
  import modal from '../modal.vue'

  export default {
    methods: {
      openMenu: function () {
        this.menu.profile = !this.menu.profile
      }
    },
    watch: {
      '$route': function () { this.menu.profile = false }
    },
    data: () => ({
      menu: {
        profile: false
      },
      logged: false,
      vertical: true,
      modal: {
        login: false,
        sign_up: false
      }
    }),
    components: { modal, signUpForm, loginForm, dropdownMenu, userImage }
  }
</script>
