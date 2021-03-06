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

  if (type === 'class') {}

  try {
    console.log()
    let cities = await models.City.findAll({
      attributes: [
        'id',
        'name',
        [ orm.fn('count', orm.col('UserPrograms.User.NpsAuthor.id')), 'count' ]
      ],
      include: [
        {
          attributes: [],
          model: models.UserProgram,
          include: [
            {
              attributes: [],
              model: models.User,
              include: [ 
                {
                  attributes: [],
                  as: 'NpsAuthor',
                  model: models.NPS,
                  include: [ 
                    {
                      attributes: [],
                      as: 'ProgramClassNps',
                      model: models.ProgramClass,
                      through: {
                        attributes: []
                      }
                    }
                  ] 
                }
              ]
            }
          ]
        }
      ],
      group: [ orm.col('id') ]
    })
    // let [ cities ] = await orm.query(
    //   "SELECT count(`NPS`.`id`) AS `count`, `User.Programs.UserProgram`.`city_id` AS `city_id` FROM `nps` AS `NPS` LEFT OUTER JOIN `users` AS `User` ON `NPS`.`user_id` = `User`.`id` INNER JOIN (`users_programs` AS `User.Programs.UserProgram` INNER JOIN `programs` AS `User.Programs` ON `User.Programs`.`id` = `User.Programs.UserProgram`.`program_id`) ON `User`.`id` = `User.Programs.UserProgram`.`user_id` GROUP BY `User.Programs.UserProgram`.`city_id`",
    // )

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