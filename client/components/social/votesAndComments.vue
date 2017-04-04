<template>
  <span class="VotesAndComments">
    <span class="Voting__points-total">{{ voters_count }}</span>
    
    <nuxt-link :to="commentsLink" :title="comments_tooltip">
      <span :class="{ 'VotesAndComments__comments Voting__points-total': true, 'no-comments': comments === 0 }">{{ comments }}</span>
    </nuxt-link>
  </span>
</template>

<script>
  export default {
    data: () => ({
      comments: 4,
      voters_count: 10,
      commentsLink: '',
      comments_tooltip: null
    })
  }
</script>
