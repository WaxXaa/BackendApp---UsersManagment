import { hashSync, genSaltSync } from 'bcrypt'
import crypto from 'node:crypto';
import userModel from '../models/userModel.js'

export const userRegisterService = async ({ fname, lname, password, gender, birthDate, email }) => {
  try {
    const emailExist = await userModel.findEmail(email);
    if (emailExist) {
      throw { status: 409, message: 'Email not available' };
    }

    const newUserId = crypto.randomBytes(16).toString('hex');

    const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS))
    const passwordHash = hashSync(password, salt)

    const birthDateObj = new Date(birthDate[0], birthDate[1] - 1, birthDate[2]);

    const newUser = await userRegister({
      userId: newUserId,
      fname,
      lname,
      password: passwordHash,
      birthDate: birthDateObj,
      gender,
      email
    });
    const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    return { newUser, token, message: 'User has been successfully registered' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: error.message || 'Internal Server Error' };
  }
}

