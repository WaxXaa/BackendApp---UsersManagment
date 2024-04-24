import { compareSync } from "bcrypt"
import jwt from "jsonwebtoken"
const { sign } = jwt
import UserModel from '../models/userModel.js'
const userLoginService = async ({ email, password }) => {
  const existingUser = await UserModel.findEmail(email)
  if (!existingUser) {
    throw { status: 401, message: 'incorrect credentials' }
  }
  const checkPassword = compareSync(password, existingUser.Password)
  if (!checkPassword) {
    throw { status: 401, message: 'incorrect credentials' }
  }
  const token = sign(
    { userId: existingUser.UserId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' }
  )
  console.log(token)
  return { existingUser, token }
}
export default userLoginService