export default async (old, models) => {
  let cities = await old.query('SELECT `program_city` FROM `users` GROUP BY `program_city`')

  cities[0].map(async el => {
    await models.City.findOrCreate({
      where: {
        name: el.program_city
      }
    })
  })
}