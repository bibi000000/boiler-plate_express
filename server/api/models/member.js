const { Sequelize, Model } = require('sequelize')

class Member extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: '0', // 일반: 0, 관리자: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Member',
      tableName: 'member',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static associate(db) {
    // db.User.hasMany(db.Board, { foreignKey: 'writer', sourceKey: 'id' })
    // db.User.hasMany(db.Notice, { foreignKey: 'writer', sourceKey: 'id' })
  }
}

module.exports = Member