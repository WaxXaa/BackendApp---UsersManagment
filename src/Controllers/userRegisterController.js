const User = require('../Schemas/userSchema')
const { hash } = require('bcrypt')
const { QueryTypes } = require('sequelize')
const { newId } = require('../util/generateId')
const userRegisterController = async (req, res, next) => {
  const { userName: UserName, name: Name, password: Password, gender: Gender, birthDate: BirthDate, email: Email } = req.body
  const userExist = await User.query(`SELECT UserName FROM Users WHERE UserName = ${UserName}`, { type: QueryTypes.SELECT })
  if (userExist) { return res.status(409).send({ errors: ['username not available'] }) }
  const emailExist = await User.query(`SELECT Email FROM Users WHERE Email = ${Email}`, { type: QueryTypes.SELECT })
  if (emailExist) { return res.status(409).send({ errors: ['email not available'] }) }
  let newUserId;
  while (true) {
    newUserId = newId()
    const userIdExist = await User.findByPk(newUserId)
    if (userIdExist === null) {
      break
    }
  }
  const passwordHash = await hash(Password, process.env.SALT_ROUNDS)

  const newUser = await User.create({
    UserId: newUserId,
    UserName,
    Name,
    passwordHash,
    BirthDate: new Date(BirthDate),
    Gender,
    Email,
    CreatedAt: Date.now(),
    UpdatedAt: Date.now()
  })
  return res.status(201).send('user has been successfully registered')
}

module.exports = userRegisterController