import User from '../schemas/userSchema.js'
class UserModel {
  async userRegister(userData) {
    try {
      const newUser = await User.create(userData)
      return newUser
    } catch (error) {
      throw error
    }
  }
  async findUserName(userName) {
    try {
      console.log(userName)
      const userNameExist = await User.findOne({ userName: userName });
      console.log('MODEL', User, userNameExist)
      return userNameExist;
    } catch (error) {
      throw error
    }
  }
  async findEmail(userEmail) {
    try {
      const emailExist = await User.findOne({ userEmail });
      return emailExist;
    } catch (error) {
      throw error
    }
  }
  async getUserInfoById(userId) {
    try {
      const userInfo = await User.findById(userId, '-password');
      return userInfo
    } catch (error) {
      throw error
    }
  }
  async deleteUserAndRelatedData(userId) {
    try {
      await Post.deleteMany({ user: userId });

      // Borrar al usuario
      await User.findByIdAndDelete(userId);

    } catch (error) {
      console.error('Error deleting user and related data:', error);
      throw error;
    }
  }
  async updateEmail(userId, newEmail) {
    try {
      const result = await User.updateOne({ userId }, { $set: { email: newEmail } });
      if (result.nModified === 0) {
        throw { message: 'Error updating email' }
      }
      return;
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  }
  async updateUser(userId, newUserData) {
    try {
      const userInfo = await User.findById(userId);

      if (!userInfo) {
        return null;
      }

      if (newUserData.new_fname) {
        userInfo.firstName = newUserData.new_fname;
      }
      if (newUserData.new_lname) {
        userInfo.lastName = newUserData.new_lname;
      }
      if (newUserData.new_userName) {
        userInfo.userName = newUserData.new_userName;
      }

      await userInfo.save();

      return userInfo;
    } catch (error) {
      throw error;
    }
  }
  async getUserInfoByUserName(userName) {
    try {
      const userInfo = await User.findOne({ userName })
      return userInfo
    } catch (error) {
      throw error
    }
  }
  async updatePassword(userId, newPasswordHash) {
    try {
      await User.update({ Password: newPasswordHash }, { where: { Id: userId } });
    } catch (error) {
      throw error
    }
  }

}
export default UserModel