<template>
  <div class="login-form">    
    <h3 class="login-form__title">{{ $t('account.auth.sign_up.title') }}</h3>

    <form autoComplete="off" method="post">
      <div class="login-form__row">
        <label class="login-form__label">{{ $t('account.auth.sign_up.email') }}</label>
        <input class="login-form__input" type="text" v-model="info.email" :placeholder="$t('account.auth.sign_up.email')" />
      </div>

      <div class="login-form__row">
        <label class="login-form__label">{{ $t('account.auth.sign_up.first_name') }}</label>
        <input class="login-form__input" type="text" v-model="info.first_name" :placeholder="$t('account.auth.sign_up.first_name')" />
      </div>

      <div class="login-form__row">
        <label class="login-form__label">{{ $t('account.auth.sign_up.last_name') }}</label>
        <input class="login-form__input" type="text" v-model="info.last_name" :placeholder="$t('account.auth.sign_up.last_name')" />
      </div>
        
      <div class="login-form__row login-form__row_double-margin">
        <button  class="login-form__btn" type="submit" :disabled="isBtnDisabled" @click.prevent="submit">
          <template v-if="!submitting">{{ $t('account.auth.sign_up.submit') }}</template>
          <template v-else>{{ $t('account.auth.sign_up.process') }}</template>
        </button>
      </div>
      
    </form>

    <div class="login-form__row">{{ $t('account.auth.sign_up.terms') }}</div>
  </div>
</template>

<script>
  export default {
    computed: {
      isBtnDisabled: function () {
        return this.submitting ||
          (!this.info.email || !this.info.email.length ||
          !this.info.last_name || !this.info.last_name.length ||
          !this.info.first_name || !this.info.first_name.length)
      }
    },
    methods: {
      submit: function () {
        if (this.loginBtnDisabled) return false

        this.submitting = true
        setTimeout(() => {
          this.submitting = false
        }, 3000)
      }
    },
    data: () => ({
      info: {
        email: null,
        last_name: null,
        first_name: null
      },
      submitting: false
    })
  }
</script>
