<template>
  <nuxt-child />
</template>

<script>
  export default {
    layout: 'feed',
    data ({ redirect, params }) {
      if (!params.category) return redirect('/rating/all')
    },
    mounted () {
      this.$router.replace('/rating/all')
    }
  }
</script>
