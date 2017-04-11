import orm, { models } from '../../models'

const initMiddleware = async (ctx, next) => {
  ctx.__.program = ctx.params.program

  await next()
}

const testFeedMethod = async ctx => {
  ctx.body = { hello: ctx.__.program || 'no program' }
}

export default {
  initMiddleware,
  testFeedMethod
}

// const getUserFeed = async ctx => {
//   // let { programs = [] } = ctx.session
//   // let ids = []

//   // programs.map(el => ids.push(el.id))

//   let rawResult = await models.UserPost.findAll({
//     attributes: [ 'post_id', 'money_fact' ],
//     include: [
//       {
//         model: models.Post,
//         attributes: [ 'title', 'type', 'content' ],
//         include: [
//           {
//             model: models.Program,
//             // where: {
//             //   id: { $in: ids }
//             // },
//             through: {
//               attributes: []
//             }
//           },
//           {
//             required: false,
//             attributes: [ 'id' ],
//             model: models.Like,
//             group: [ 'post_id' ]
//           },
//           {
//             required: false,
//             model: models.Comment,
//             attributes: [ 'id' ]
//           },
//           {
//             model: models.User,
//             attributes: [ 'name', 'email', 'id' ] 
//           }
//         ]
//       },
//       {
//         as: 'ReplyTo',
//         required: false,
//         model: models.TaskReply,
//         attributes: [ 'status' ],
//         include: [
//           {
//             required: false,
//             model: models.TaskPost,
//             include: [ models.Post ]
//           },
//           {
//             model: models.User,
//             attributes: [ 'name' ]
//           }
//         ]
//       }
//     ]
//   })

//   let result = []

//   rawResult.map(el => {
//     el = el.toJSON()
//     el.like_count = el.Post.Likes ? el.Post.Likes.length : 0
//     el.comment_count = el.Post.Comments ? el.Post.Comments.length : 0
//     result.push(el)
//   })
  
//   ctx.body = { result }
// }