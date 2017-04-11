import { orm, models } from '../../models'
import bcrypt from 'bcrypt-nodejs'

// Создание ссылки для активации/создания пользователя в программе
const createActivationLink = async ctx => {
  let programId = ctx.request.query.program
  let accountId = 1

  let program = await models.Program.findOne({
    where: { id: programId, is_enabled: true }
  })

  let account = await models.Account.findOne({
    where: { id: accountId },
    include: [
      {
        required: false,
        as: 'Activations',
        model: models.UserActivation,
        where: { program_id: programId }
      }
    ]
  })

  let activation = account.get('Activations')[0]

  if (program && account && !activation) {
    let hash = bcrypt.hashSync(account.get('first_name') + account.get('created_at') + program.get('title'))

    activation = await models.UserActivation
      .create({
        hash,
        account_id: account.id,
        program_id: program.id
      })
  }

  ctx.body = { activation }
}

const createUser = async ctx => {
  let { hash } = ctx.request.query

  let activation = await models.UserActivation.findOne({
    where: { hash, is_enabled: true }
  })

  ctx.body = { activation }
}

const createUserReal = async ctx => {
  let { hash, point_a, point_b } = ctx.request.query

  let activation = await models.UserActivation.findOne({
    where: { hash, is_enabled: true, activated_at: null }
  })

  let user
  if (activation) {
    user = await models.User.create({
      point_a,
      point_b,
      account_id: activation.get('account_id'),
      program_id: activation.get('program_id')
    })

    if (user) {
      activation.update({
        is_enabled: false,
        activated_at: Date.now()
      })
    }
  }

  let account = await models.Account.findAll({
    include: [
      {
        as: 'Users',
        model: models.User,
        include: [
          models.Program
        ]
      }
    ]
  })

  ctx.body = { user, account }
}

export default {
  createUser,
  createUserReal,
  createActivationLink
}