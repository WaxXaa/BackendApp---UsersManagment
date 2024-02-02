import { User } from '../schemas/userSchema.js'
class UserModel {
  async userRegister(userData) {
    try {
      const newUser = await User.create(userData)
      return newUser
    } catch (error) {
      throw error
    }
  }
  async findEmail(email) {
    try {
      const emailExist = await User.findOne({ email });
      return emailExist;
    } catch (error) {
      throw error
    }
  }
  async getUserInfoByID(id) {
    try {
      const userInfo = await User.findById(id, '-password');
      return userInfo
    } catch (error) {
      throw error
    }
  }
}
export default new UserModel()