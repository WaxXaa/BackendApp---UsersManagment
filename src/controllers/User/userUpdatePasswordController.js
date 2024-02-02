const { hashSync, compareSync, genSaltSync } = require("bcrypt")
const User = require("../../schemas/userSchema")

const userUdatePasswordController = async (req, res) => {
  const { Id, nPassword } = req.body
  const user = await User.findByPk(Id)
  if (!Id) return res.status(401).send({ errors: ['unauthorized user'] })
  const passwordVerification = compareSync(nPassword, user.Password)
  if (!passwordVerification) return res.status(401).send({ errors: ['unauthorized user'] })
  const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS))
  const newPasswordHash = hashSync(nPassword, salt)
  await User.update({ Password: newPasswordHash }, { where: { Id } })
  return res.send('updated')
}
module.exports = userUdatePasswordController