import { userRegisterService } from '../../services/userRegisterService.js'
const userRegisterController = async (req, res, next) => {
  const { userName, fname, lname, password, birthDate, email } = req.body;
  try {
    const result = await userRegisterService({ userName, fname, lname, password, birthDate, email })
    return res.json(result);
  } catch (error) {
    const status = error.status || 500
    console.error(error);
    return res.status(status).send(error.message || 'Internal Server Error');
  }
}

export default userRegisterController

