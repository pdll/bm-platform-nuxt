module.exports = {
  srcDir: 'client/',
  /* router extender */
  router: {
    extendRoutes (routes) {
      routes.push({
        name: 'feed-wow',
        path: 'bm-:category',
        component: '~pages/feed/index.vue'
      })
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'БМ Платформа',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'БМ Платформа' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bootstrap.css',
    // '~assets/css/main.css',
    { src: '~assets/postcss/style.pcss', lang: 'postcss' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /* plugins */
  plugins: [
    '~plugins/components.js',
    '~plugins/i18n.js',
    '~plugins/numeral.js'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
