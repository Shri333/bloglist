const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  if (user) {
    const password = await bcrypt.compare(
      request.body.password,
      user.passwordHash
    )
    if (password) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY
      )
      response.status(200).send({
        token,
        uid: user._id,
        username: user.username,
        name: user.name,
      })
    } else {
      response.status(401).send('Invalid password')
    }
  } else {
    response.status(401).send('Invalid username')
  }
})

module.exports = loginRouter
