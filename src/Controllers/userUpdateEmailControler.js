const { compareSync } = require("bcrypt")
const User = require("../Schemas/userSchema")

const userUpdateEmailController = async (req, res) => {
  const { Id, nEmail, Password } = req.body
  const user = await User.findByPk(Id)
  if (!user) return res.status(401).send({ errors: ['unauthorized user'] })
  const passwordVerification = compareSync(Password, user.Password)
  if (!passwordVerification) return res.status(401).send({ errors: ['unauthorized user'] })
  const existingEmail = await User.findOne({ attributes: ['Email'], where: { Email: nEmail } })
  if (existingEmail) return res.status(409).send({ errors: ['email not available'] })
  await User.update({ email: nEmail }, { where: { Id } })
  return res.send('updated')
}
