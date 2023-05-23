const exprees = require('express')
const userRouter = require('../Routes/user.routes')
const app = exprees()
app.use(exprees.json())
app.use('/user', userRouter)
module.exports = app
