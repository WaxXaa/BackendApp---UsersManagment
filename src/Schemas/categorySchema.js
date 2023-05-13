const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const Post = require('./postSchema')
const Category = sequelize.define("Category", {
  CategoryId: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false })
Category.hasMany(Post)
module.exports = Category