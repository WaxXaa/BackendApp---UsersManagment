const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const Post = require('./postSchema')
const Comment = sequelize.define('Comment', {
  Id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  PostCommentId: {
    type: DataTypes.UUIDV4,
    references: {
      model: Post,
      key: 'id'
    }
  },
  CommentedPostId: {
    type: DataTypes.UUIDV4,
    references: {
      model: Post,
      key: 'id'
    }
  }
}, { timestamps: false })
Post.belongsToMany(Post, {
  through: Comment,
  unique: false
})
module.exports = Comment
