import userModel from '../models/userModel.js'
const updatedEmailService = async (id, newEmail) => {
  try {
    const emailExist = await userModel.findEmail(newEmail)
    if (emailExist) {
      throw { status: 201, message: 'new email not available' } // check status code
    }
    const user = await userModel.getUserInfoById(id)
    if (!user) {
      throw { status: 401, message: 'unauthorized user' }
    }
    await userModel.updateEmail(id, newEmail)
    return
  } catch (error) {
    console.log(error)
    throw { status: 500, message: error.message }
  }
}
export default updatedEmailService
