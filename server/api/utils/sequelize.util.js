const { Sequelize } = require('sequelize')
require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { timezone: 'Asia/Seoul' }
)

module.exports = sequelize