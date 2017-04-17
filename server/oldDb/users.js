export default async (old, models) => {
  let users = await old.query('SELECT * FROM `users`')
  let count = 0
  
  let programs = await models.Program.findAll()
  let rawProgramRoles = await models.ProgramRole.findAll()

  let programRoles = {}
  rawProgramRoles.map(el => {
    programRoles[el.get('name')] = el
  })

  await users[1].map(async (el, i) => {
    let error = []
    try {
      let [ user ] = await models.User.findOrCreate({
        where: {
          email: el.email
        },
        defaults: {
          first_name: el.first_name,
          last_name: el.last_name,
          name: el.name,
          uid: el.uid,
          birthday: el.birthday,
          gender: el.gender,
          picture_small: el.picture_small,
          picture_large: el.picture_large,
          remote_ip: el.remote_ip,
          migration_id: el.id
        }
      })

      if (el.current_program || el.all_programs) {
        let city_id = null
        if (el.program_city) {
          let cityObj = await models.City.findOne({ name: el.program_city })
          city_id = cityObj.get('id')
        }

        let progs = [ programs[el.current_program - 1] ]
        if (el.all_programs) progs.push(programs[(el.current_program == 1 ? 2 : 1) - 1])

        user.addProgram(progs, { city_id, is_activated: 1 })
          .catch(err => console.log(err))

        if (el.couch) {
          progs.map(async program => {
            await models.UserProgramRole.findOrCreate({
              where: {
                user_id: user.get('id'),
                program_id: program.get('id'),
                program_role_id: programRoles['coach'].get('id')
              },
              defaults: {
                is_enabled: true
              }
            })
          })
        } else if (el.volunteer) {
          progs.map(async program => {
            await models.UserProgramRole.findOrCreate({
              where: {
                user_id: user.get('id'),
                program_id: program.get('id'),
                program_role_id: programRoles['volunteer'].get('id')
              },
              defaults: {
                is_enabled: true
              }
            })
          })
        } else {
          progs.map(async program => {
            await models.UserProgramRole.findOrCreate({
              where: {
                user_id: user.get('id'),
                program_id: program.get('id'),
                program_role_id: programRoles['student'].get('id')
              },
              defaults: {
                is_enabled: true
              }
            })
          })
        }
      }      

      count++
    } catch (err) { console.error(err) }
    console.log('total users: ', count)
  })  
}