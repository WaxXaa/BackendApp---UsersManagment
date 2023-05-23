const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const User = require('./userSchema')
const FollowerUser = sequelize.define('FollowerUser', {
  Id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.UUIDV4,
    references: {
      model: User,
      key: 'id'
    }
  },
  FollowerId: {
    type: DataTypes.UUIDV4,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { timestamps: false })
User.belongsToMany(User, {
  through: FollowerUser,
  unique: false
})
  (async () => await FollowerUser.sync({ force: true }))()
module.exports = FollowerUser
