<template>
  <div>
    {{ $route.params }}
  </div>
</template>

<script>
  let categories = [ 'hot', 'created', 'trending' ]

  export default {
    validate ({ params }) {
      return categories.indexOf(params.category) !== -1
    }
  }
</script>
