require('dotenv').config()
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const tokenHandler = require('./utils/token_handler')
const userHandler = require('./utils/user_handler')
const errorHandler = require('./utils/error_handler')

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const app = express()

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/testing', testRouter)
}

app.use(cors())
app.use(express.json())
app.use(tokenHandler)
app.use('/api/blogs', userHandler, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)
app.use('/static', express.static('build/static'))

app.get('*', (request, response) => {
  response.sendFile('index.html', { root: 'build' })
})

module.exports = app
