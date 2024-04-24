import { hashSync, genSaltSync } from 'bcrypt'
import crypto from 'node:crypto';
import UserModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
const userModel = new UserModel()

export const userRegisterService = async ({ userName, fname, lname, password, birthDate, email }) => {
  try {

    // const emailExist = await userModel.findEmail(email);
    // if (emailExist) {
    //   throw { status: 409, message: 'Email not available' };
    // }
    // const userNameExist = await userModel.findUserName(userName);
    // if (!userNameExist) {
    //   console.log(userNameExist)
    //   throw { status: 409, message: 'UserName not available' }
    // }

    const newUserId = crypto.randomBytes(16).toString('hex');

    const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS))
    const passwordHash = hashSync(password, salt)

    const birthDateObj = new Date(birthDate[0], birthDate[1], birthDate[2]);

    const newUser = await userModel.userRegister({
      userId: newUserId,
      userName,
      fname,
      lname,
      password: passwordHash,
      birthDate: birthDateObj,
      email
    });
    const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    return { newUser, token, message: 'User has been successfully registered' };
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: error.message || 'Internal Server Error' };
  }
}

export default userRegisterService