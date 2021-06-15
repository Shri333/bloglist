const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userHandler = async (request, response, next) => {
  if (request.token) {
    const token = jwt.verify(request.token, process.env.JWT_KEY)
    if (token.id) {
      request.user = await User.findById(token.id)
    } else {
      response.status(401).send('Invalid token')
    }
  }
  next()
}

module.exports = userHandler
