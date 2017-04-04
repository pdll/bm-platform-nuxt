<template>
  <article :class="{ 'PostSummary hentry': true, 'with-image': thumb }" itemScope itemType ="http://schema.org/blogPost">
                                  
    <div class="PostSummary__author_with_userpic">
      <span class="PostSummary__time_author_category">
          <div class="vcard">
            <!--<userPic :account="p.author" :postdate="p.created" />-->
          </div>
          <!--{!archived && <Reblog author={p.author} permlink={p.permlink} />}-->
      </span>
      
      <div class="PostSummary__task-status" v-if="isTask && p.category == 'bm-open'">
        <span class="PostSummary__task-checking" v-if="!status">НА ПРОВЕРКЕ</span>
        <span class="PostSummary__task-approved" v-else-if="status === 1">ПРОВЕРЕНО</span>
        <span class="PostSummary__task-declined" v-else-if="status === 2">ОТКЛОНЕНО</span>
      </div>
    </div>

    <div :class="{ 'PostSummary__collapse': hasFlag }">
        <div class="float-right">
          <!--<Voting pending_payout={pending_payout} total_payout={total_payout} showList={false} cashout_time={cashout_time} post={post} flag />-->
        </div>
    </div>

    {{ post }}

    <!--{reblogged_by}-->

    <div class="PostSummary__header-otvet" v-if="isTask && p.category == 'bm-open'">
      <div class="PostSummary__header-otvettitle">Выполнение задания</div>
      <h1 class="entry-title">
        <!--<nuxt-link :to="'/'">{{ title_text }}</nuxt-link>-->
        <a :href="getLink()" @click.prevent="$emit('onClick', post.id)">{{ title_text }}</a>
      </h1>
    </div>
    <div class="PostSummary__header" v-else>
      <h1 class="entry-title">
        <a :href="getLink()" @click.prevent="$emit('onClick', post.id)">{{ title_text }}</a>
      </h1>
    </div>

    <div class="PostSummary__content">
      <div class="PostSummary__body entry-content">
        <a :href="getLink()" @click.prevent="$emit('onClick', post.id)">{{ desc }}</a>
        <!--<nuxt-link :to="'/'">{{ desc }}</nuxt-link>-->
      </div>
        
        <!--{fileLink}-->
    </div>

    <!--{thumb}-->

    <div class="PostSummary__footer">
        <voting />        
        <votingAndComment :post="post" :link="'/'" />

        <!--{moneyToday}-->
    </div>

    <!--<ApproveAndRejectButtons v-if="isTask" @approve="approveReply" @reject="rejectReply" />-->
              
  </article>
</template>

<script>
  import voting from '../social/voting.vue'
  import votingAndComment from '../social/votesAndComments.vue'
  import userPic from '../user/pic.vue'

  export default {
    methods: {
      approveReply: function () {},
      rejectReply: function () {},
      getLink: function () {
        return this.$router.resolve({ name: 'user-post', params: { user: '@bm-paperdoll', post: '123213' } }).href
      }
    },
    data: () => ({
      status: 0,
      thumb: false,
      isTask: true,
      title_text: 'Ghbdtn',
      desc: 'Задания выполнены: 1175 посетителей (скрин прикрепил) 100 скачиваний Лид магнита есть (скрин прикрепил)…',
      hasFlag: false,
      p: {
        author: 'pdll',
        created: Date.now()
      }
    }),
    props: {
      post: { type: Object, default: null }
    },
    components: { userPic, votingAndComment, voting }
  }
</script>
