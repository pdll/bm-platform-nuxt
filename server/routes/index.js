import _ from 'lodash'
import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'

// orm instance
import { orm } from '../models'

// routes
import feedRoutes from './feed'
import accountRoutes from './account'

let Router = bridge(koaRouter)
let router = new Router()

orm
  .sync()
  .then(res => {})
  .catch(err => console.log(err))

const initRoutes = async (ctx, next) => {
  if (!ctx.__) ctx.__ = {}
  await next()
}

router.bridge('/api', [ initRoutes ], router => {
  // restrict default routes
  router.get('/', ctx => ctx.body = {})
  router.post('/', ctx => ctx.body = {})

  // apply account routes
  router.bridge('/users', accountRoutes)

  // apply feed routes
  router.bridge('/feed', feedRoutes)
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