<template>
  <div></div>
</template>

<script>
  export default {
    data ({ redirect }) { return redirect('/') },
    mounted () { this.$router.replace('/') }
  }
</script>
