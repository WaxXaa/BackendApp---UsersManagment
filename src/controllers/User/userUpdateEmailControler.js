import updatedEmailService from '../../services/updateEmailService.js'
const userUpdateEmailController = async (req, res) => {
  try {
    const { id } = req
    const { newEmail } = req.body
    await updatedEmailService(id, newEmail)
    res.status(200).send('Email  has been successfully udate')
  } catch (error) {
    const status = error.status || 500
    res.status(status).json({ message: error.message || 'Internal server error' })
  }
}
export default userUpdateEmailController
