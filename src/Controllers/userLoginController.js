const { Op } = require("sequelize")
const User = require("../Schemas/userSchema")
const { compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const userLoginController = async (req, res) => {
  const { credential, password: Password } = req.body
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ UserName: credential }, { Email: credential }]
    }
  })
  if (!existingUser) return res.status(401).send({ errors: ['incorrect credentials'] })
  const checkPassword = compareSync(Password, existingUser.Password)
  if (!checkPassword) return res.status(401).send({ errors: ['incorrect credentials'] })
  const jwt = sign(
    { data: { id: existingUser.UserId, name: existingUser.Name } },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' }
  )
  console.log(jwt)
  return res.json({ jwt, id: existingUser.UserId })
}
module.exports = userLoginController