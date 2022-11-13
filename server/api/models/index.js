const fs = require('fs')
const path = require('path')
const basename = `index.js`
const db = {}
const sequelize = require('../config/sequelize')
db.sequelize = sequelize

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.'!==0) && (file!==basename) && (file.slice(-3)==='.js'))
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))
    model.init(sequelize)
    db[model.name] = model
    console.log(`model.name:`, model.name);
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db