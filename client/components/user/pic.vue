<template>
  <div class="User__wrap">
    <div class="Author__avatar_wrapper">
      <div class="User">
        <template v-if="loading">Загрузка</template>
        <!--<LoadingIndicator type="circle" inline />-->
        <img v-else-if="url" :src="_urls.proxyImage(url || '')" :onError="onError" />  
        <div v-else class="Userpic__defaultAva"></div>
        <!--{process.env.BROWSER ?
            url ? <Link to={linkFromProps || '/@' + username.name}> <img src={_urls.proxyImage(url || '')}  onError={this.onError} /></Link> : <Link href={'/@' + username.name}><div class="User__defaultAva"></div></Link> :
            <LoadingIndicator type="circle" inline />}-->
      </div>
    </div>

    <span class="Author">
      <span itemProp="author" itemScope itemType="http://schema.org/Person" class="Author__name">
        <nuxt-link :to="'/'">{{ nameFromProps || fullName }}</nuxt-link>
         <!--|| { name: 'user', params: { user: '@' + username.name } } }-->
      </span>
      <!--{postDateTime}-->
    </span>

    <div class="PostSummary__niche">
      <!--{userOccupation}-->
    </div>
  </div>
  <!--<div class="Userpic">
    <template v-if="loading">Загрузка</template>
    <LoadingIndicator type="circle" inline />
    <img v-else-if="url" :src="_urls.proxyImage(url || '')" :onError="onError" />  
    <div v-else class="Userpic__defaultAva"></div>
  </div>-->
</template>

<script>
  export default {
    mthods: {
      onError: function () {},
      _urls: function () {
        return {
          proxyImage: function () {}
        }
      }
    },
    data: () => ({
      url: null,
      loading: false
    })
  }
</script>
