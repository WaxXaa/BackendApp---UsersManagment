const User = require("../Schemas/userSchema")

const userUpdateNameConstroller = async (req, res) => {
  const { Id, nName, nUserName } = req.body
  const existingUser = await User.findByPk(Id)
  if (!existingUser) return res.status(401).send({ errors: ['unauthorized user'] })
  const existingUserName = await User.findOne({ attributes: ['UserName'], where: { UseraName: nUserName } })
  if (existingUserName) return res.status(409).send({ errors: ['username not available'] })
  const resp = await User.update({ Name: nName, UseraName: nUserName }, { where: { Id } })
  return res.send('updated')
}