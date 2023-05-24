const User = require('../Schemas/userSchema')
const { hashSync, genSaltSync } = require('bcrypt')
const { QueryTypes } = require('sequelize')
const { newId } = require('../util/generateId')
const userRegisterController = async (req, res, next) => {
  const { userName: UserName, name: Name, password: Password, gender: Gender, birthDate: BirthDate, email: Email } = req.body
  // const userExist = await User.query(`SELECT UserName FROM Users WHERE UserName = ${UserName}`, { type: QueryTypes.SELECT })
  const userExist = await User.findOne({ attributes: ['UserName'], where: { UserName } })
  if (userExist) { return res.status(409).send({ errors: ['username not available'] }) }
  // const emailExist = await User.query(`SELECT Email FROM Users WHERE Email = ${Email}`, { type: QueryTypes.SELECT })
  const emailExist = await User.findOne({ attributes: ['Email'], where: { Email } })
  if (emailExist) { return res.status(409).send({ errors: ['email not available'] }) }
  let newUserId;
  while (true) {
    newUserId = newId()
    const userIdExist = await User.findByPk(newUserId)
    if (userIdExist === null) {
      break
    }
  }
  console.log(typeof (process.env.SALT_ROUNDS))
  const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS))
  const passwordHash = hashSync(Password, salt)

  const newUser = await User.create({
    UserId: newUserId,
    UserName,
    Name,
    Password: passwordHash,
    BirthDate: new Date(BirthDate),
    Gender,
    Email,
    CreatedAt: Date.now(),
    UpdatedAt: Date.now()
  })
  console.table(newUser)
  return res.status(201).send('user has been successfully registered')
}

module.exports = userRegisterController