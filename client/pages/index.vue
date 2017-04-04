<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
  export default {
    mounted () {
      if (this.$route.name === 'index') this.$router.replace({ name: 'feed' })
    }
  }
</script>
