const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')
const Post = require('./postSchema')
const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      min: 1,
      max: 10,
      isAlphanumeric: true,
      isEmail: false,
      isUrl: false,
      isLowercase: true
    }
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 2,
      max: 16,
      isEmail: false,
      isUrl: false
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
      max: 30,
      isAlphanumeric: true,
      isEmail: false,
      isUrl: false
    }
  },
  Gender: {
    type: DataTypes.STRING(1),
    validate: {
      is: /[MF]/,
      max: 1
    }
  },
  Birthdate: {
    type: DataTypes.DATE
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  CreatedAt: DataTypes.BIGINT,
  UpdatedAt: DataTypes.BIGINT
},
  { timestamps: false }
)
User.hasMany(Post, {
  type: DataTypes.STRING,
  foreignKey: {
    allowNull: false
  }
})
// const f = async () => await User.sync({ force: true })
// f()

module.exports = User
