const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const User = require('./userSchema')
const Category = require('./categorySchema')
const FollowerCategory = sequelize.define('FollowerCategory', {
  Id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  CategoryId: {
    type: DataTypes.UUIDV4,
    references: {
      model: Category,
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
User.belongsToMany(Category, {
  through: FollowerCategory,
  unique: false
})

module.exports = FollowerUser
