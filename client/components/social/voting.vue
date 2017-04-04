<template>
  <span class="Voting">
    <span class="Voting__inner">
        
      <span :class="{ 'Voting__button Voting__button-up': true, 'Voting__button--upvoted': myVote > 0, 'votingUp': votingUpActive }" v-if="!loading">
        <a href="#" v-if="votingUpActive">{up}</a>
        <a href="#" v-else @click="voteUpClick" :title="myVote > 0 ? 'remove_vote' : 'upvote'">{up}</a>
      </span>
      <LoadingIndicator type="circle" v-else />
        
    </span>

    {voters_list}
  </span>
</template>

<script>
  export default {
    methods: {
      voteUpClick: function () {}
    },
    data: () => ({
      up: 2,
      myVote: 1,
      loading: false,
      votingUpActive: true
    })
  }
</script>
