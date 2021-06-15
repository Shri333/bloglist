const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const newUser = {
  username: 'sdadi',
  name: 'Shrihan Dadi',
  password: 'ayylmao',
}

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('urmom', 10)
  const rootUser = new User({
    username: 'root',
    name: 'Shrihan Dadi',
    passwordHash,
  })
  await rootUser.save()
})

describe('GET users', () => {
  test('request should respond with data of root user', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })
})

describe('POST users', () => {
  test('request should add a new user to the database', async () => {
    const response = await api.post('/api/users').send(newUser)
    expect(response.status).toBe(201)
  })

  test('database should have correct number of users after POST request', async () => {
    await api.post('/api/users').send(newUser)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(2)
  })

  test('bad username should respond with status code 400', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'no', password: 'lol' })
    expect(response.status).toBe(400)
  })

  test('no password should respond with no password message', async () => {
    const response = await api.post('/api/users').send({ username: 'qwerty' })
    expect(response.text).toBe('No password given')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
