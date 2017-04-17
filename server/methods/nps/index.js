import _ from 'lodash'
import { orm, models } from '../../models'

let classesByType = {
  user: 'User',
  post: 'Post',
  group: 'Group',
  program: 'Program',
  class: 'ProgramClass'
}

const resultsReplies = async ctx => {
  
}

const resultsCities = async ctx => {
  const { event } = ctx.query

  let type = 'class'
  if (event === 'platform' || event === 'coach') type = event

  let whereEvent = {}

  if (type === 'class') {
    // whereEvent = {
      // id: Sequelize.col('user_id'),
      // current_program: event
    // }
  }

  try {
    // const cities = await models.User.findAll({
    //   include: [ models.UserProgram ]
    // })

    const cities = await models.User.findAll({
      attributes: [
        'name' ,
        // [ orm.col('Programs.UserProgram.city_id'), 'city_id' ],
        // [ orm.fn('count', orm.col('Programs.UserProgram.city_id')), 'city_count' ]
      ],
      include: [
        {
          required: true,
          model: models.Program,
          attributes: [ 'title' ],
          through: {
            attributes: [ 'city_id' ],
            where: { 
              city_id: { $ne: null }              
            }
          }
        },
        {
          attributes: [ 'total' ],
          required: true,
          as: 'NpsAuthor',
          model: models.NPS,
          include: [
            {
              as: 'ProgramClassNps',
              model: models.ProgramClass
            }
          ]
        }
      ],
      limit: 10
    })


    // const cities = await models.NPS.findAll({	
    //   include: [
    //     {
    //       model: models.User,
    //       include: [
    //         {
    //           model: models.Program
    //         }
    //       ]
    //     }
    //   ]
    // })
      // attributes: [
      //   [ sequelize.col('User.program_city'), 'name' ],
      //   [ sequelize.fn('count', sequelize.col('Feedback.id')), 'count' ]
      // ],
      // where: Object.assign(
      //   {},
      //   { type }
      // ),
      // include: [
      //   {
      //     attributes: [],
      //     model: models.User,
      //     where: Object.assign(
      //       {},
      //       whereEvent
      //     )
      //   }
      // ],
      // group: [ sequelize.col('User.program_city') ]
    // })

    // let coaches = yield models.User.findAll({
    //   attributes: [
    //     'id',
    //     'name',
    //     'first_name',
    //     'last_name'
    //   ],
    //   where: {
    //     couch: true
    //   },
    //   group: [ sequelize.col('id') ]
    // })

    ctx.body = { cities }
  } catch (e) {
    console.log(e)
  }
}

const sendInfo = async ctx => {
  let { currentUser, npsTarget, npsTargetClass } = ctx.__

  let previous = await models.NPS.findOne({
    where: {
      user_id: currentUser.get('id')
      // и условие по времени
    },
    include: [
      {
        as: npsTargetClass + 'Nps',
        model: models[npsTargetClass]
      }
    ]
  })

  ctx.body = { previous }
}

const sendPost = async ctx => {
  const { score_1, score_2, score_3, body } = ctx.request.body
  const { currentUser, npsTarget, npsTargetClass } = ctx.__

  let negatedScore = [ score_1, score_2, score_3 ].filter(el => !!el).map(el => parseInt(el)) || []
  let total_score = _.reduce(negatedScore, (sum, x) => sum + x, 0) / negatedScore.length

  let Nps = await models.NPS.create({
    score_1,
    score_2,
    score_3,
    total: total_score,
    comment: body || '',
    user_id: currentUser.get('id'),
  })

  await Nps['add' + npsTargetClass + 'Nps'](npsTarget)

  ctx.body = {
    result: Nps,
    success: true
  }
}

const sendInit = async (ctx, next) => {
  let { type, id } = ctx.query

  try {
    ctx.__.npsTargetClass = classesByType[type]

    if (!id) throw new Error('No target entry id provided')
    if (!ctx.__.npsTargetClass) throw new Error('Wrong feedback type requested')

    let targetEntry = await models[ctx.__.npsTargetClass].findOne({
      where: { id }
    })

    if (!targetEntry) throw new Error('No target entry found')

    ctx.__.npsTarget = targetEntry

    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

export default {
  send: {
    info: sendInfo,
    post: sendPost,
    init: sendInit
  },
  results: {
    replies: resultsReplies,
    cities: resultsCities,
  }
}