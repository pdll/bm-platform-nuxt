import _ from 'lodash'
import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'
import bcrypt from 'bcrypt-nodejs'

// orm instance
import { orm, models } from '../models'

// routes
import feedRoutes from './feed'
import accountRoutes from './account'

let Router = bridge(koaRouter)
let router = new Router()

orm
  .sync()
  .then(async res => {
    let defaultUser = await models.User.findOne({
      where: { email: 'paperdoll.msk@gmail.com' }
    })

    let defaultProgram = await models.Program.findOne({
      where: { alias: 'ceh-23' }
    })

    if (!defaultUser) {
      defaultUser = await models.User.create({
        name: 'bm-paperdoll',
        first_name: 'Stepan',
        last_name: 'Yurinov',
        gender: 'male',
        email: 'paperdoll.msk@gmail.com'
      })

      defaultUser.save()
    }

    if (!defaultProgram) {
      defaultProgram = await models.Program.create({
        title: 'ЦЕХ 23',
        alias: 'ceh-23',
        start_at: Date.now(),
        finish_at: Date.now()
      })

      defaultProgram.save()
    }
  })
  .catch(err => console.log(err))

const initRoutes = async (ctx, next) => {
  if (!ctx.__) ctx.__ = {}

  let User = models.User.findOne({
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

  router.bridge('/users', router => {
    router.get('/list', async ctx => {
      let users = await models.User.findAll({
        attributes: [ 'id', 'name', 'first_name', 'last_name' ]
      })

      ctx.status = 200
      ctx.body = { users, ok: true }
    })

    router.bridge('/program', router => {

      router.bridge('/activation', router => {
        router.post('/', async ctx => {
          let { hash, confirmation } = ctx.request.body

          let userProgram = await models.Program.findOne({
            attributes: [ 'title', 'alias' ],
            include: [
              {
                required: true,
                as: 'Users',
                attributes: [ 'name', 'first_name', 'last_name' ],
                model: models.User,
                through: {
                  required: true,
                  where: { hash, is_activated: false }
                }
              }
            ]
          })

          if (confirmation && userProgram) {
            let up = userProgram.get('Users')[0].UserProgram

            await up.update({
              is_activated: true,
              activated_at: Date.now()
            })
          }

          ctx.body = { program: userProgram || null }
        })
      })      

      router.post('/register', async ctx => {
        let { program_id, user_id } = ctx.request.body        
        
        let result = await models.UserProgram.findOne({
          where: {
            user_id,
            program_id
          }
        })

        if (!result) {
          result = await models.UserProgram.create({
            program_id,
            user_id,
            hash: bcrypt.hashSync(program_id + '-' + user_id + '-' + Date.now())
          })
          ctx.body = { result }
        } else {
          ctx.body = { message: 'Уже зарегистрирован' }
        }        
      })
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