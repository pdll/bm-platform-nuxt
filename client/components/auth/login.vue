<template>
  <div class="">
    <div v-if="message">{{ message }}</div>

    <div class="login-form" v-if="!recovery.mode">
      <h3 class="login-form__title">{{ $t('account.auth.login.title') }}</h3>
      
      <form method="post">
        <div class="login-form__row">
          <label class="login-form__label">{{ $t('account.auth.login.enter_username') }}</label>
          <input class="login-form__input" type="text" v-model="info.email" :placeholder="$t('account.auth.login.enter_username')" autoComplete="on" :disabled="submitting" />
          <!--<div class="error LoginForm__hide-error" v-if="login.error && login.error.email">{{ login.error.email }}</div>-->
        </div>

        <div class="login-form__row">
          <label class="login-form__label">{{ $t('account.auth.login.enter_password') }}</label>
          <input class="login-form__input" type="password" v-model="info.password" :placeholder="$t('account.auth.login.enter_password')" autoComplete="on" :disabled="submitting" />
          <!--<div class="error LoginForm__hide-error" v-if="login.error && login.error.password">{{ login.error.password }}</div>-->
        </div>
                
        <div class="login-form__row login-form__row_double-margin">
          <button class='login-form__btn' type="submit" :disabled="loginBtnDisabled" @click.prevent="log_in">
            <template v-if="submitting">{{ $t('account.auth.login.process') }}</template>
            <template v-else>{{ $t('account.auth.login.submit') }}</template>
          </button>
        </div>

        <div class="login-form__row login-form__row_centered">
          <a class="login-form__link" href="#" @click.prevent="recovery.mode = true">Восстановить пароль</a>
        </div>
        <div class="login-form__row login-form__row_centered">
          <div class="LoginForm__label-support">{{ $t('account.auth.login.support') }} <a href="mailto:help@molodost.bz">help@molodost.bz</a></div>
        </div>
      </form>

    </div>

    <div class="LoginForm__recovery" v-if="recovery.mode">
      <div class="login-form">
        <h3 class="login-form__title">{{ $t('account.auth.recovery.title') }}</h3>

        <div class="alert alert_success" v-if="recovery.success">{{ $t('account.auth.recovery.success') }}</div>
        
        <form autoComplete="off" method="post">

          <div class="login-form__row">
            <label class="login-form__label">{{ $t('account.auth.login.enter_username') }}</label>
            <input class="login-form__input" type="text" v-model="info.email" placeholder="enter_username" />
            <!--<div class="error LoginForm__hide-error" v-if="recovery.error && recovery.error.email">{{ recovery.error.email }}</div>-->
          </div>

          <div class="login-form__row login-form__row_double-margin">
            <button class='login-form__btn' type="submit" :disabled="recoveryBtnDisabled" @click.prevent="recover">
              <template v-if="submitting">{{ $t('account.auth.recovery.process') }}</template>
              <template v-else>{{ $t('account.auth.recovery.submit') }}</template>
            </button>
          </div>

          <div class="login-form__row login-form__row_centered">
            <a class="login-form__link" href="#" @click.prevent="recovery.mode = false">{{ $t('account.auth.recovery.login') }}</a>
          </div>          

        </form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      message: function () { return null },
      title: function () { return 'title' },
      passwordRecovery: function () { return 'pass recovery' },
      loginBtnDisabled: function () {
        return this.submitting ||
          (!this.info.email || !this.info.email.length || !this.info.password || !this.info.password.length)
      },
      recoveryBtnDisabled: function () {
        return this.submitting || (!this.info.email || !this.info.email.length)
      }
    },
    methods: {
      log_in: function () {
        if (this.loginBtnDisabled) return false

        this.submitting = true
        this.$store.dispatch('user/login', { login: this.info.email, password: this.info.password })
          .then(() => {
            this.submitting = false
            if (!this.redirectToAccount) this.$emit('onAfterSuccess')
            else {}
          })
          .catch(err => { console.log(err) })
      },
      recover: function () {
        if (this.recoveryBtnDisabled) return false

        this.submitting = true
        setTimeout(() => {
          this.submitting = false
          this.recovery.success = true
          setTimeout(() => { this.recovery.success = false }, 2000)
        }, 2000)
      }
    },
    data: () => ({
      recovery: {
        mode: false,
        success: false,
        error: null
      },
      login: {
        error: null
      },
      info: {
        email: null,
        password: null
      },
      submitting: false
    }),
    props: {
      redirectToAccount: { type: Boolean, default: false }
    }
  }
</script>
