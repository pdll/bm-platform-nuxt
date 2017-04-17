import { models } from '../models'

export default async old => {
  let users = await models.User.findAll({
    attributes: [ 'id', 'migration_id', 'first_name', 'last_name' ]
  })

  let assoc = {}
  users.map(el => {
    assoc[el.migration_id] = el
  })

  const associateUser = el => {
    return assoc[el] ? assoc[el] : null
  }
  
  let groups = await models.GroupMigrations.findAll()

  if (!groups.length) {
    let [ migrations ] = await old.query("SELECT `groups`.`user_id`, `users`.`current_program`, `users`.`all_programs`, GROUP_CONCAT(`coach_`.`id`) AS `coach_group`, GROUP_CONCAT(DISTINCT `coach_`.`current_program`) AS `coach_group_program`, GROUP_CONCAT(`ten_`.`id`) AS `ten_group`, GROUP_CONCAT(DISTINCT `ten_`.`current_program`) AS `ten_group_program`, GROUP_CONCAT(DISTINCT `ten_`.`hundred`) AS `ten_group_hundred`, GROUP_CONCAT(`hundred_`.`id`) AS `hundred_group`, GROUP_CONCAT(DISTINCT `hundred_`.`current_program`) AS `hundred_group_program`, GROUP_CONCAT(DISTINCT `hundred_`.`polk`) AS `hundred_group_polk`, GROUP_CONCAT(`polk_`.`id`) AS `polk_group`, GROUP_CONCAT(DISTINCT `polk_`.`current_program`) AS `polk_group_program`, `groups`.`type`, `groups`.`money`, `groups`.`total_score`, `groups`.`id` FROM `groups` LEFT JOIN `users` AS `coach_` ON `coach_`.`couch_group` = `groups`.`user_id` LEFT JOIN `users` AS `ten_` ON `ten_`.`ten` = `groups`.`user_id` LEFT JOIN `users` AS `hundred_` ON `hundred_`.`hundred` = `groups`.`user_id`  LEFT JOIN `users` AS `polk_` ON `polk_`.`polk` = `groups`.`user_id` INNER JOIN `users` ON `groups`.`user_id` = `users`.`id` GROUP BY `groups`.`id`")
    migrations.map(async el => {
      await models.GroupMigrations.create(el)
    })
  }
  
  let rawPrograms = await models.Program.findAll()
  let programs = {}
  rawPrograms.map(el => {
    programs[el.get('id')] = el
  })

  groups = await models.GroupMigrations.findAll()

  let refactored = []

  groups.map(el => {
    // console.log(el)
    let { id, money, total_score, type, user_id } = el
    let element = { migration_id: id, money, total_score, type, leader: assoc[user_id] }

    if (type === 'ten') element.users = (el.ten_group || '').split(',').map(associateUser)
    if (type === 'hundred') element.users = (el.hundred_group || '').split(',').map(associateUser)
    if (type === 'polk') element.users = (el.polk_group || '').split(',').map(associateUser)
    if (type == 'couch' || type == 'couch_mzs') element.users = (el.coach_group || '').split(',').map(associateUser)

    if (type == 'couch' || type == 'couch_mzs') element.program = (el.coach_group_program || []).split(',').map(el => programs[el] || null)
    else element.program = programs[el.current_program]
      
    element.type = (type == 'couch' || type == 'couch_mzs') ? 'coach' : type

    if (element.users.length) refactored.push(element)
  })

  refactored.map(async el => {
    let title = ''
    let leader_name = el.leader.get('first_name') + ' ' + el.leader.get('last_name')

    switch (el.type) {
      case 'ten':
        title += 'Десятка ' + leader_name;
        break;
      case 'hundred':
        title += 'Сотня ' + leader_name;
        break;
      case 'polk':
        title += 'Полк ' + leader_name;
        break;
      case 'coach':
        title += 'Тренерская группа ' + leader_name;
        break;
      default: 
        break;
    }

    let [ group ] = await models.Group.findOrCreate({
      where: {
        migration_id: el.migration_id
      },
      defaults: {
        title,
        money: el.money,
        total_score: el.total_score,
        leader_id: el.leader.get('id'),
        type: el.type === 'coach' ? 'coach' : 'game'
      }
    })
    // 
    let users = {}
    el.users = el.users.filter(user => {
      if (!user) return false
      users[user.get('id')] = user
    })

    await group.addUsers(Object.values(users))
    await group.addProgram(el.program)

    if (el.type === 'ten' || el.type === 'hundred' || el.type === 'polk') {
      await models.GameGroup.findOrCreate({
        where: { group_id: group.get('id') },
        defaults: { type: el.type }
      })
    }
    if (el.type === 'coach') {
      await models.CoachGroup.findOrCreate({
        where: { group_id: group.get('id') }
      })
    }
  })
  
}
