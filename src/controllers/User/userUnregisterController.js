const { compareSync } = require("bcrypt")
const User = require("../../Schemas/userSchema")
//const FollowerUser = require("../../Schemas/follwerUserSchema")
const { Op, where } = require("sequelize")
const Post = require("../../Schemas/postSchema")
//const Save = require("../../Schemas/saveSchema")

const userUnregisterController = async (req, res) => {
  const { Id, Password } = req.body
  const user = await User.findByPk(Id)
  if (!user) return res.status(401).send({ errors: ['unauthorized user'] })
  const passwordVerification = compareSync(Password, user.Password)
  if (!passwordVerification) return res.status(401).send({ errors: ['unauthorized user'] })
  await user.destroy()
  // await FollowerUser.destroy({ where: { [Op.or]: [{ UserId: Id }, { FollowerId: Id }] } })
  await Post.destroy({ where: { UserId: Id } })
  return res.send()
}
module.exports = userUnregisterController