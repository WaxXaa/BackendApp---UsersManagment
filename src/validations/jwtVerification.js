const { verify } = require('jsonwebtoken')

const jwtValidation = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization)
    return res.status(401).send({ errors: ['unauthorized user'] })
  const jwt = authorization.split(' ')[1]
  if (!jwt)
    return res.status(401).send({ errors: ['unauthorized user'] })
  try {
    const authorized = verify(jwt, process.env.JWT_SECRET_KEY)
    if (!authorized) { return res.status(401).send({ errors: ['unauthorized user'] }) }
    next()
  } catch (error) {
    return res.status(401).send({ errors: ['unauthorized user'] })
  }
}