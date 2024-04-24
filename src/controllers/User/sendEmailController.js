import sendEmailService from '../../services/sendEmailService.js'
const sendEmailConstroller = async (req, res) => {
  try {
    //const { userId } = req
    const result = await sendEmailService(/*userId*/)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(error.status).json(error)
  }
}
export default sendEmailConstroller
