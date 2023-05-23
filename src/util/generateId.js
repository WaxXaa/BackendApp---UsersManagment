const { v4: uuidV4 } = require('uuid')
const newId = () => {
  return uuidV4()
}
module.exports = { newId }