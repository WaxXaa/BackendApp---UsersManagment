const { Router } = require('express')
const userRegisterController = require('../Controllers/userRegisterController')
const userLoginController = require('../Controllers/userLoginController')
const userRouter = Router()


userRouter.post('/register', userRegisterController)
userRouter.post('/login', userLoginController)

module.exports = userRouter