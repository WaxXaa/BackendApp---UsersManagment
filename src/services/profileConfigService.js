import userModel from '../models/userModel.js'
const profileConfigService = async (id) => {
  try {
    const dataProfile = await userModel(id)
    if (!dataProfile) {
      throw { status: 401, message: 'unauthorized user' }
    }
    return dataProfile
  } catch (error) {
    throw { message: 'internal server error' }
  }
}
export default profileConfigService