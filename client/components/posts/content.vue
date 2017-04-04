<template>
  <!--let post_header = <h1 class="entry-title">{content.title}</h1>
    if(content.depth > 0) {
        let parent_link = `/${content.category}/@${content.parent_author}/${content.parent_permlink}`;
        let direct_parent_link
        if(content.depth > 1) {
            direct_parent_link = <li>
                <Link to={parent_link}>
                    {translate('view_the_direct_parent')}
                </Link>
            </li>
        }
        post_header = <div class="callout">
            <h5>{translate('you_are_viewing_single_comments_thread_from')}:</h5>
            <p>
                {content.root_title}
            </p>
            <ul>
                <li>
                    <Link to={content.url}>
                        {translate('view_the_full_context')}
                    </Link>
                </li>
                {direct_parent_link}
            </ul>
        </div>
    }-->
  <article class="PostFull hentry" itemScope itemType ="http://schema.org/blogPost">
    <div class="float-right">
      <voting :post="post" />
    </div>

    <div class="PostFull__header">
      <h1 class="entry-title">{{ content.title }}</h1>
      <span class="PostFull__time_author_category vcard">
        {translate('by')} <author :account="content.author" />

        <Tooltip :t="new Date(content.created).toLocaleString()">
          <Icon name="clock" class="space-right" />
          <span class="TimeAgo">10 minutes ago</span>
        </Tooltip>          
      </span>
    </div>

    <!--{showEdit ?
        renderedEditor :-->
    <div class="PostFull__body entry-content">
      <div>
        <p>Пыталась по честному сделать задание, с 1000 посещений сайта и 100 скачиваний лид-магнита. Но практика показала, что набралось  116 посещений и 32 скачивания. За то честно)))  Сторритейлинг - дал уже небольшие результаты. Нашлось несколько человек-изготовителей, которые предлагают сотрудничество, со мной, как с дизайнером. Несколько людей заинтересованных, но пока без покупки. Друзья в шоке были, от бешеной активности на моей странице, интересовались-"что происходит?"))) В целом, задание со сторритейлингом мне понравилось. А задание с 1000 посетителей, для новичка - это слишком! Полегче БМ!   <img src="https://imgp.platform.molodost.bz/0x0/https://bm-platform.s3.eu-central-1.amazonaws.com/BkBa8Udje-1auas11l.png"></p>
      </div>
      <!--<MarkdownViewer formId={formId + '-viewer'} text={content_body} jsonMetadata={jsonMetadata} large highQualityPost={high_quality_post} noImage={!content.stats.pictures} />-->
      
      <a :href="'/'" :class="{ ['PostSummary__file ' + fileicon]: fileicon }" target="_blank">filename</a>
    </div>
    <!--}-->

    <div class="PostFull__footer align-middle">
      <div class="PostFull_Footer-leftblock">
        <voting :post="post" />
        <votesComments :post="post" />
      </div>

      <div class="PostFull_Footer-rightblock">
        <reblog v-if="!archived" :author="author" :permlink="permlink" />

        <div class="PostFull__reply">
          <a v-if="!STM_Config.read_only_mode && content.category !== 'bm-tasks'" @click.prevent="onShowReply">translate('reply')</a>
          <a @click.prevent="onShowEdit" v-if="!showEdit && showEditOption">translate('edit')</a>
          <a @click.prevent="onDeletePost" v-if="!showReply && showDeleteOption">{translate('delete')}</a>
        </div>
        
        <div class="PostFull__Share">
          <span>Поделиться:</span>
          <a class="PostFull__share-vk"></a>
          <a class="PostFull__share-fb"></a>
          <a class="PostFull__share-tw"></a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column small-12">
        {showReply && renderedEditor}
        <!--{content.category === 'bm-tasks' ? <SubmitStory type="submit_story" taskId={p.json_metadata.tags} taskTitle={p.title} successCallback={() => { window.location = '/created/bm-open' }} /> : ''}-->
      </div>
    </div>
    
  </article>
</template>

<script>
  import author from '../user/author.vue'
  import voting from '../social/voting.vue'
  import reblog from './reblog.vue'
  import votesComments from '../social/votesAndComments.vue'

  export default {
    methods: {
      onShowEdit: function () {},
      onShowReply: function () {},
      onDeletePost: function () {}
    },
    data: () => ({
      STM_Config: {
        read_only_mode: false
      },
      content: {
        title: 'Привет мир',
        category: 'bm',
        author: {
          first_name: 'Степан',
          last_name: 'Юринов',
          name: 'paperdoll'
        }
      },
      post: {},
      fileicon: null,
      author: null,
      permlink: null,
      showEditOption: true,
      showDeleteOption: true,
      showReply: false,
      showEdit: false,
      archived: false
    }),
    components: { reblog, voting, votesComments, author }
  }
</script>
