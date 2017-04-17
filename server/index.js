import 'babel-polyfill'
import Koa from 'koa'
import Nuxt from 'nuxt'
import passport from 'koa-passport'

import router from './routes'
import config from '../nuxt.config.js'
import models, { sequelize } from './models'

var app = new Koa()
config.dev = !(app.env === 'production')

var session = require('koa-session2')
var bodyparser = require('koa-bodyparser')

var nuxt = new Nuxt(config)

app.use(async (ctx, next) => {
  ctx.models = models
  await next()
})

app
  .use(session({
    key: '532de0cf9e75be011da7'
  }))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(passport.initialize())
  .use(passport.session())

// Build only in dev mode
// if (config.dev) {
//   nuxt.build()
//   .catch((error) => {
//     console.error(error) // eslint-disable-line no-console
//     process.exit(1)
//   })
// }

app.use(async (ctx, next) => {
  ctx.status = 200
  ctx.req.session = ctx.session
  // await nuxt.render(ctx.req, ctx.res)
})

app.listen(config.env.port || 3000)
