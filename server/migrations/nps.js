import moment from 'moment'
import { models } from '../models'

export default async old => {
  let rawUsers = await models.User.findAll({
    attributes: [ 'id', 'migration_id', 'name' ]
  })
  let users = {}
  rawUsers.map(user => users[user.migration_id] = user.id)

  let rawClasses = await models.ProgramClass.findAll({
    attributes: [ 'id', 'held_at' ],
    include: [ models.Program ]
  })

  let classes = {}
  rawClasses.map(el => {
    if (!classes[el.Program.get('id')]) classes[el.Program.get('id')] = {}
    classes[el.Program.get('id')][el.get('held_at')] = el
  })

  let [ feedback ] = await old.query("SELECT `feedback`.`id`, `users`.`id` AS `user_id`, `users`.`current_program`, `users`.`all_programs`, `users`.`couch_group`, `feedback`.`created_at`, `feedback`.`body`, `feedback`.`score_1`, `feedback`.`score_2`, `feedback`.`score_3`, `feedback`.`total_score`, `feedback`.`type` FROM `feedback` LEFT JOIN `users` ON `feedback`.`user_id` = `users`.`id`")

  // await models.NPS.destroy({ truncate: true })

  feedback.map(async el => {
    if (el.current_program) {
      let { current_program, type, score_1, score_2, score_3, total_score, body, id, user_id, created_at, couch_group } = el
      let defaults = { score_1, score_2, score_3, total: total_score, body, user_id: users[user_id], created_at }

      let [ NPS ] = await models.NPS.findOrCreate({
        where: {
          migration_id: id
        },
        defaults
      })

      if (type === 'platform') {
        await models.NPSPlatform.findOrCreate({
          where: {
            nps_id: NPS.get('id')
          }
        })
      }

      if (type === 'coach' && couch_group) {
        let group = await models.Group.findOne({
          where: {
            leader_id: users[couch_group],
            type: 'coach'
          },
          include: [
            {
              attributes: [],
              as: 'Programs',
              model: models.Program,
              where: {
                id: el.current_program
              },
              through: {
                attributes: []
              }
            }
          ]
        })

        console.log(group.id)
        await NPS.addGroupNps(group)
      }

      if (type === 'session') {
        let programClassesDates = Object.keys(classes[el.current_program])
        let date = moment(created_at).toDate()
        
        let prediction = 0
        programClassesDates.map((el, i) => {
          if (date >= moment(el).toDate()) prediction = i
        })

        await NPS.addProgramClassNps(classes[el.current_program][programClassesDates[prediction]])
      }
    }
  })
}