import _ from 'lodash'
import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'

import { orm, models } from '../models'

let Router = bridge(koaRouter)
let router = new Router()

orm.sync().then(res => {
  // console.log(models)
})

router.bridge('/api', router => {
  router.bridge('/users', router => {
    router.get('/list', async ctx => {
      console.log(ctx.query)
      let data = await models.User.findAll({
        attributes: [ 'name', 'id', 'email' ]
      })

      ctx.body = { data }
    })

    router.get('/:user', ctx => {
      ctx.body = { param: ctx.params }
    })
  })

  router.bridge('/feed', router => {
    router.get('/all', async ctx => {
      // let { programs = [] } = ctx.session
      // let ids = []

      // programs.map(el => ids.push(el.id))

      let rawResult = await models.UserPost.findAll({
        attributes: [ 'post_id', 'money_fact' ],
        include: [
          {
            model: models.Post,
            attributes: [ 'title', 'type', 'content' ],
            include: [
              {
                model: models.Program,
                // where: {
                //   id: { $in: ids }
                // },
                through: {
                  attributes: []
                }
              },
              {
                required: false,
                attributes: [ 'id' ],
                model: models.Like,
                group: [ 'post_id' ]
              },
              {
                required: false,
                model: models.Comment,
                attributes: [ 'id' ]
              },
              {
                model: models.User,
                attributes: [ 'name', 'email', 'id' ] 
              }
            ]
          },
          {
            as: 'ReplyTo',
            required: false,
            model: models.TaskReply,
            attributes: [ 'status' ],
            include: [
              {
                required: false,
                model: models.TaskPost,
                include: [ models.Post ]
              },
              {
                model: models.User,
                attributes: [ 'name' ]
              }
            ]
          }
        ]
      })

      let result = []

      rawResult.map(el => {
        el = el.toJSON()
        el.like_count = el.Post.Likes ? el.Post.Likes.length : 0
        el.comment_count = el.Post.Comments ? el.Post.Comments.length : 0
        result.push(el)
      })
      
      ctx.body = { result }
    })
  })

  router.bridge('/auth', router => {
    router.get('/', async ctx => {
      let credentials = _.pick(ctx.request.query, [ 'name', 'password' ])

      if (!credentials.name) {
        ctx.status = 403
        ctx.body = { error: 'Invalid credentials' }
        return
      }

      // if (ctx.session.user && ctx.session.user.name === credentials.name) {
      //   ctx.body = {
      //     error: 'already logged in',
      //     user: ctx.session.user
      //   }
      //   return
      // }

      let rawUser = await models.User.findOne({
        where: {
          name: credentials.name
        },
        attributes: [ 'name', 'email', 'id' ],
        include: [
          {
            model: models.Program,
            attributes: [ 'title', 'alias', 'id' ],
            through: {
              attributes: []
            }
          }
        ]
      })

      let user = _.pick(rawUser, [ 'name', 'emaul', 'id' ])
      let programs = rawUser.Programs || []

      ctx.session = Object.assign({}, ctx.session, { user, programs })

      ctx.body = { user, programs }
    })
  })

  router.bridge('/account', router => {
    router.get('info', ctx => {
      ctx.body = {}
    })
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