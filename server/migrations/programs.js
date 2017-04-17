import moment from 'moment'

let defaultPrograms = [
  { alias: 'ceh-23', title: 'ЦЕХ 23', start_at: moment('2017-02-25'), finish_at: moment('2017-04-15'), is_enabled: 1 },
  { alias: 'mzs-17', title: 'МЗС 17', start_at: moment('2017-02-28'), finish_at: moment('2017-04-18'), is_enabled: 1 }
]

let classes = {
  'ceh-23': [
    { title: 'Занятие 1' , held_at: moment('2017-02-25') },
    { title: 'Занятие 2' , held_at: moment('2017-03-04') },
    { title: 'Занятие 3' , held_at: moment('2017-03-11') },
    { title: 'Занятие 4' , held_at: moment('2017-03-18') },
    { title: 'Занятие 5' , held_at: moment('2017-03-25') },
    { title: 'Занятие 6' , held_at: moment('2017-04-01') },
    { title: 'Занятие 7' , held_at: moment('2017-04-08') },
    { title: 'Занятие 8' , held_at: moment('2017-04-15') }
  ],
  'mzs-17': [
    { title: 'Занятие 1' , held_at: moment('2017-02-28') },
    { title: 'Занятие 2' , held_at: moment('2017-03-07') },
    { title: 'Занятие 3' , held_at: moment('2017-03-14') },
    { title: 'Занятие 4' , held_at: moment('2017-03-21') },
    { title: 'Занятие 5' , held_at: moment('2017-03-28') },
    { title: 'Занятие 6' , held_at: moment('2017-04-04') },
    { title: 'Занятие 7' , held_at: moment('2017-04-11') },
    { title: 'Занятие 8' , held_at: moment('2017-04-18') }
  ]
}

export default async (old, models) => {
  defaultPrograms.map(async el => {
    let [ program ] = await models.Program.findOrCreate({
      where: {
        alias: el.alias
      },
      defaults: {
        title: el.title,
        start_at: el.start_at,
        finish_at: el.finish_at,
        is_enabled: el.is_enabled
      }
    })

    classes[program.get('alias')].map(async el => {
      await models.ProgramClass.findOrCreate({
        where: {
          program_id: program.get('id'),
          title: el.title,
          held_at: el.held_at
        }
      })
    })
  })  
}