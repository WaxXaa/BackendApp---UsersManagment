const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const Post = require('./postSchema')
const User = require('./userSchema')
const Save = sequelize.define('Save', {
  Id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  PostId: {
    type: DataTypes.UUIDV4,
    references: {
      model: Post,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUIDV4,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { timestamps: false })

Post.belongsToMany(User, {
  through: Save,
  unique: false
})
  (async () => await Save.sync({ force: true }))()
module.exports = Save