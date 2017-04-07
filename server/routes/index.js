import koaRouter from 'koa-router'
import bridge from 'koa-router-bridge'

import { orm, models } from '../models'

let Router = bridge(koaRouter)
let router = new Router()

orm.sync().then(res => {
  console.log(models)
})

router.bridge('/session', router => {
  router.get('/restore', async ctx => {
    let result = await models.TaskPost.findAll({
      attributes: [ 'start_at', 'finish_at' ],
      include: [
        {
          attributes: [ 'title' ],
          model: models.Post
        },
        {
          attributes: [ 'status' ],
          model: models.TaskReply,
          where: {
            status: 'approved'
          },
          include: [
            {
              attributes: [ 'money_fact' ],
              model: models.UserPost,
              include: [
                {
                  attributes: [ 'title' ],
                  model: models.Post,
                  include: [
                    {
                      model: models.User,
                      attributes: [ 'name', 'email' ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })

    let feedback = await models.UserPost.findAll({
      raw: true,
      attributes: [ 'money_fact' ],
      // [ orm.fn('count', 'id'), 'count' ]
      include: [
        {
          model: models.Post,
          attributes: [ 'title' ],
          include: [
            {
              raw: true,
              required: false,
              model: models.Like,
              attributes: [ 
                [ orm.fn('count', 'id'), 'count' ]
              ],
              group: [ 'post_id' ]
            }
          ]
        }
      ]
    })
    
    ctx.body = { result, feedback }
  })
})

export default router