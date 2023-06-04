const { compareSync } = require("bcrypt")
const User = require("../Schemas/userSchema")

const userUnretegisterController = async (req, res) => {
  const { Id, Password } = req.body
  const user = await User.findByPk(Id)
  if (!user) return res.status(401).send({ errors: ['unauthorized user'] })
  const passwordVerification = compareSync(Password, user.Password)
  if (!passwordVerification) return res.status(401).send({ errors: ['unauthorized user'] })
  await user.destroy()
  return res.send()
}