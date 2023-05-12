const dotenv = require('dotenv')
dotenv.config()
const sequelize = require('./Config/db')
const server = require('./Config/http.js')
const init = async () => {
  await sequelize.authenticate()
    .then(() => console.log('Data Base conected'))
    .catch((err) => console.log('data base connection error', err))
  server.listen(process.env.PORT, () => console.log('server listening at port ', process.env.PORT))
}
init()
