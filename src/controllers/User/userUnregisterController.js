import userUnregisterService from '../../services/userUnregisterService.js'
const userUnregisterController = async (req, res) => {
  try {
    const { id } = req
    const { password } = req.body
    await userUnregisterService(id, password) //service call
    res.status(200).send('User successfully unregistered')
  } catch (error) {
    const status = error.status || 500
    res.status(status).json({ message: error.message || 'Internal server error' })
  }
}
export default userUnregisterController