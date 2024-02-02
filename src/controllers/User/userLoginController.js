import { userLoginService } from "../../services/userLoginService.js";
const userLoginController = async (req, res) => {
  try {
    const { credential } = req.body
    const result = await userLoginService(credential)
    res.json(result)
  } catch (error) {
    const status = error.status || 500
    console.log(error)
    res.status(status).send(error.message || 'internal server error')
  }
}
export default userLoginController