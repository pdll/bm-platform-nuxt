import _ from 'lodash'
import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'
import bcrypt from 'bcrypt-nodejs'

// orm instance
import { orm, models } from '../models'
import { ormOld, migrations } from '../oldDb'

// routes
import npsRoutes from './nps'
import feedRoutes from './feed'
import accountRoutes from './account'

let Router = bridge(koaRouter)
let router = new Router()

orm
  .sync()
  .then(async res => {
    // await migrations.programs(ormOld, models)
    // await migrations.roles(ormOld, models)
    // await migrations.cities(ormOld, models)
    // await migrations.users(ormOld, models)
    // await migrations.gameGroups(ormOld, models)
    // await migrations.feedback(ormOld)
  })
  .catch(err => console.log(err))

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

  // apply feed routes
  router.bridge('/feed', feedRoutes)

  router.bridge('/nps', npsRoutes)

  router.bridge('/users', router => {
    
  })
})

router.bridge('/session', router => {
  router.get('/restore', async ctx => {
    // let result = await models.TaskPost.findAll({
    //   attributes: [ 'start_at', 'finish_at' ],
    //   include: [
    //     {
    //       attributes: [ 'title' ],
    //       model: models.Post
    //     },
    //     {
    //       attributes: [ 'status' ],
    //       model: models.TaskReply,
    //       where: {
    //         status: 'approved'
    //       },
    //       include: [
    //         {
    //           attributes: [ 'money_fact' ],
    //           model: models.UserPost,
    //           include: [
    //             {
    //               attributes: [ 'title' ],
    //               model: models.Post,
    //               include: [
    //                 {
    //                   model: models.User,
    //                   attributes: [ 'name', 'email' ]
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // })

    // let result = await models.Post.findAll({
    //   attributes: [ 'title' ],
    //   include: [
    //     {
    //       model: models.Like,
    //       attributes: [ 'id' ],
    //       include: [
    //         {
    //           model: models.User,
    //           attributes: [ 'name' ]
    //         }
    //       ]
    //     },
    //     {
    //       required: false,
    //       attributes: [ 'name' ],
    //       model: models.Tag
    //     },
    //     {
    //       attributes: [ 'title', 'alias' ],
    //       model: models.Program,
    //       where: {
    //         id: { $in: [ 1 ] }
    //       }
    //     },
    //     {
    //       required: true,
    //       as: 'post_details',
    //       attributes: [ 'money_fact' ],    
    //       model: models.UserPost
    //     },
    //     {
    //       attributes: [ 'name' ],
    //       model: models.User
    //     }
    //   ]
    // })

    // let result = await models.Program.findAll({
    //   include: [
    //     {
    //       attributes: [ 'name' ],
    //       model: models.User,
    //       include: [
    //         {
    //           model: models.Post,
    //           include: [
    //             models.TaskPost,
    //             models.UserPost
    //           ]
    //         }
    //       ]
    //     }
    //   ],
    //   where: {
    //     id: 2
    //   }
    // })

    // let feedback = await models.UserPost.findAll({
    //   raw: true,
    //   attributes: [ 'money_fact' ],
    //   // [ orm.fn('count', 'id'), 'count' ]
    //   include: [
    //     {
    //       model: models.Post,
    //       attributes: [ 'title' ],
    //       include: [
    //         {
    //           raw: true,
    //           required: false,
    //           model: models.Like,
    //           attributes: [ 
    //             [ orm.fn('count', 'id'), 'count' ]
    //           ],
    //           group: [ 'post_id' ]
    //         }
    //       ]
    //     }
    //   ]
    // })
    
    ctx.body = { result, feedback: [] }
  })
})

export default router