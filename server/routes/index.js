import _ from 'lodash'
import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'
import bcrypt from 'bcrypt-nodejs'

// orm instance
import { orm, models } from '../models'
import { ormOld, migrations } from '../migrations'

// routes
import npsRoutes from './nps'
import feedRoutes from './feed'
import accountRoutes from './account'

let Router = bridge(koaRouter)
let router = new Router()

const initRoutes = async (ctx, next) => {
  if (!ctx.__) ctx.__ = {}

  let User = await models.User.findOne({
    where: { id: 1 }
  })

  ctx.__.currentUser = User

  await next()
}

router.bridge('/api', [ initRoutes ], router => {
  // restrict default routes
  router.get('/', ctx => ctx.body = {})
  router.post('/', ctx => ctx.body = {})

  // apply account routes
  router.bridge('/account', accountRoutes)

  /**
   * bridge позволяет применять массив из middleware'ов на набор путей перед тем, как провалиться по ним
   * Это позволяет по пути прохождения в роут записывать в контекст нужные переменные или запрощать доступ и т.д.
   */
  router.bridge('/feed', feedRoutes)

  router.bridge('/nps', npsRoutes)

  router.bridge('/users', router => {})
})

const migrate = async () => {
  /** 
   * миграции, убирать комментарии на свой страх и риск ;)
   * раскомментировать по очереди каждую волну миграций и ждать примерно по 10 минут.
   */

  /**
   * Первая волна миграций
   */
  // await migrations.programs(ormOld, models)
  // await migrations.roles(ormOld, models)
  // await migrations.cities(ormOld, models)
  // await migrations.users(ormOld, models)
  /**
   * Вторая волна миграции
   */
  // await migrations.gameGroups(ormOld, models)
  /**
   * Третья волна миграций
   */
  // await migrations.feedback(ormOld)
}

orm.sync()
  .then(async () => {
    await migrate()
  })

export default router