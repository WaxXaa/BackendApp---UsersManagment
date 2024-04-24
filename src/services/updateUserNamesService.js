import userModel from '../models/userModel.js'
const userUpdateNamesService = async ({ userId, new_fname, new_lname, new_userName }) => {
  try {
    const userInfo = await userModel.getUserInfoById(userId);
    if (!userInfo) {
      throw { status: 404, message: "User not found." };
    }

    if (new_userName) {
      const existingUser = await userModel.getUserInfoByUserName(new_userName);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw { status: 400, message: "Username is already in use." }
      }
    }

    const updatedUser = await userModel.updateUser(userId, {
      new_fname,
      new_lname,
      new_userName,
    })

    if (!updatedUser) {
      throw { status: 404, message: "User not found." }
    }

    return updatedUser;
  } catch (error) {
    throw error
  }
}
export default userUpdateNamesService