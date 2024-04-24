import { Router } from 'express'
import jwtValidation from '../middlewares/jwtVerification.js'
import controllers from '../controllers/User/acces.js'
const {
  userLoginController,
  userRegisterController,
  userProfileConfigController,
  userUnregisterController,
  userUpdateEmailController,
  userUpdateNameController,
  userUpdatePasswordController,
  sendEmailController
} = controllers
import rateLimiter from '../middlewares/rateLimiter.js'
const userRouter = Router()

userRouter.use(rateLimiter) // limitador

userRouter.post('/register', userRegisterController)
userRouter.post('/login', userLoginController)
userRouter.use(jwtValidation)
userRouter.get('/profile-config', userProfileConfigController)

//email
userRouter.post('/email-verification', sendEmailController)

userRouter.patch('/update-username', userUpdateNameController)
userRouter.patch('/update-email', userUpdateEmailController)
userRouter.patch('/update-password', userUpdatePasswordController)
userRouter.delete('/unregister', userUnregisterController)
export default userRouter