const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = `index.js`
const db = {}
const sequelize = require('../utils/sequelize.util')
db.sequelize = sequelize

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.'!==0) && (file!==basename) && (file.slice(-3)==='.js'))
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      // Sequelize
      Sequelize.DataTypes
    )
    db[model.name] = model
    console.log('db[model.name]: ', model);
  })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  module.exports = db