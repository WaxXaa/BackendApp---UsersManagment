const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const Post = require('./postSchema')
const Category = sequelize.define("Category", {
  CategoryId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false })

// Category.hasMany(Post, {
//   type: DataTypes.UUIDV4,
//   foreignKey: {
//     allowNull: false
//   }
// })
// const f = async () => await Category.sync({ force: true })
// f()
module.exports = Category