import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

import cities from './cities'
import users from './users'
import programs from './programs'
import roles from './roles'
import gameGroups from './gameGroups'
import feedback from './nps'

let db = {}
let basename = path.basename(module.filename)
var config = require(__dirname + '/../config.json').oldDb;

if (config.use_env_variable) var sequelize = new Sequelize(process.env[config.use_env_variable])
else var sequelize = new Sequelize(config.database, config.username, config.password, config)

export const ormOld = sequelize

export const migrations = {
  cities,
  users,
  roles,
  programs,
  gameGroups,
  feedback
}