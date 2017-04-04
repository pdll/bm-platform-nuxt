<template>
  <div class="auth-container">
    <SignUpForm />
  </div>  
</template>

<script>
  import SignUpForm from '../../components/auth/sign_up.vue'

  export default {
    layout: 'auth',
    data ({ params, store, redirect }) {
      return { logged: false }
    },
    components: { SignUpForm }
  }
</script>
