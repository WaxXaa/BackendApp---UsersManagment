import profileConfigService from '../../services/profileConfigService.js'
const profileConfigController = async (req, res) => {
  try {
    const id = req
    if (!id) return res.status(401).send({ message: 'unauthorized user' })
    console.log(req)
    const userProfileData = await profileConfigService({ id } = req)
    if (!userProfileData)
      return res.status(401).send({ message: 'unauthorized user' })
    return res.json(userProfileData)
  } catch (error) {
    const status = error.status || 500
    return res.status(status).send(error.message || 'internal server error')
  }

}
export default profileConfigController
