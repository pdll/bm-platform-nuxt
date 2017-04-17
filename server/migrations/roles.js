import moment from 'moment'

let defaultRoles = [
  { name: 'user', is_enabled: true },
  { name: 'moderator', is_enabled: true },
  { name: 'admin', is_enabled: true }
]

let defaultProgramRoles = [
  { name: 'student', is_enabled: true },
  { name: 'volunteer', is_enabled: true },
  { name: 'coach', is_enabled: true },
  { name: 'speaker', is_enabled: true }
]

export default async (old, models) => {
  defaultRoles.map(async el => {
    await models.Role.findOrCreate({
      where: {
        name: el.name
      },
      defaults: {
        is_enabled: el.is_enabled
      }
    })
  })  

  defaultProgramRoles.map(async el => {
    await models.ProgramRole.findOrCreate({
      where: {
        name: el.name
      },
      defaults: {
        is_enabled: el.is_enabled
      }
    })
  })
}