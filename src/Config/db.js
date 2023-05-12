const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('Vizer_Dev', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mariadb'
})

module.exports = sequelize
