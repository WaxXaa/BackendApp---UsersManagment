const User = require("../Schemas/userSchema")

const profileConfigController = async (req, res) => {
  const { id: Id } = req.bbody
  const user = await User.findByPk(Id)
  if (!user) return res.status(401).send({ errors: ['unauthorized user'] })
  const { UserName, Email, Name } = user
  return res.json({ userName: UserName, email: Email, name: Name })
}
module.exports = profileConfigController