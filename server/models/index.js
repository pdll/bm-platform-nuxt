import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

let db = {}
let basename = path.basename(module.filename)
var config = require(__dirname + '/../config.json').db;

if (config.use_env_variable) var sequelize = new Sequelize(process.env[config.use_env_variable])
else var sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
  .filter(file => ((file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === '.js')))
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db)
})

export const models = db
export const orm = sequelize