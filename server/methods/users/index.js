const usersList = async ctx => {
  let users = await models.User.findAll({
    attributes: [ 'id', 'name', 'first_name', 'last_name' ]
  })

  ctx.status = 200
  ctx.body = { users, ok: true }
}

const userProgramActivateion = async ctx => {
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
}

const userProgramRegistration = async ctx => {
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
  } else ctx.body = { message: 'Уже зарегистрирован' }
}

export default {
  list: usersList,
  program: {
    registration: userProgramRegistration,
    activation: userProgramActivateion
  }
}