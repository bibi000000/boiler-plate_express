const fs = require('fs')
const Sequelize = require('sequelize')
require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { timezone: 'Asia/Seoul' }
)
db.sequelize = sequelize

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.'!==0) && (file!==basename) && (file.slice(-3)==='.js'))
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    console.log('db[model.name]: ', model);
    db[model.name] = model
  })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  module.exports = db