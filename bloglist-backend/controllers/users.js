const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(id).populate('blogs', { user: 0 })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  if (request.body.password && request.body.password.length >= 5) {
    const passwordHash = await bcrypt.hash(request.body.password, 10)
    const user = new User({
      username: request.body.username,
      name: request.body.name,
      passwordHash,
    })
    const result = await user.save()
    result.populate('blogs', { user: 0 }, (error, result) => {
      response.status(201).json(result)
    })
  } else if (!request.body.password) {
    response.status(400).send('No password given')
  } else {
    response.status(400).send('Password too short (must be at least 5 characters)')
  }
})

module.exports = usersRouter
