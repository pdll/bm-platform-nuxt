<template>
  <div class="auth-container">
    <LoginForm :redirectToAccount="true" />
  </div>
</template>

<script>
  import LoginForm from '../../components/auth/login.vue'

  export default {
    layout: 'auth',
    data ({ params, store, redirect }) {
      return { logged: false }
    },
    components: { LoginForm }
  }
</script>
