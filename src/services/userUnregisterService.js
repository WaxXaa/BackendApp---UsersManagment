import { compareSync } from "bcrypt"
import userModel from '../../models/userModel.js'
const userUnregisterService = async (id, password) => {
  try {
    const userData = await userModel.getUserInfoById(id)
    if (!userData) {
      throw { status: 401, message: 'unauthorized user' }
    }
    const isSamePassword = compareSync(password, userData.Password)
    if (!isSamePassword) {
      throw { status: 401, message: 'unauthorized user' }
    }
    const userDelete = await userModel.deleteUserAndRelatedData(id)
    if (!userDelete) {
      throw { status: 500, message: 'server error, user delete faild.' }
    }
    return;
  } catch (error) {
    console.log(error);
    throw { status: 500, message: error.message || 'Internal Server Error' };
  }
}
export default userUnregisterService