const { Router } = require('express')
const userRegisterController = require('../Controllers/userRegisterController')
const userRouter = Router()


userRouter.post('/register', userRegisterController)

module.exports = userRouter