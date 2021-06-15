const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const passwordHash = await bcrypt.hash(process.env.ROOT_PASSWORD, 10)
  const rootUser = new User({
    username: 'root',
    name: 'Shrihan Dadi',
    passwordHash,
  })
  const user = await rootUser.save()
  const newBlog = new Blog({
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: user._id
  })
  const blog = await newBlog.save()
  const savedUser = await User.findById(user._id)
  savedUser.blogs = savedUser.blogs.concat(blog._id)
  await savedUser.save()
})

describe('POST', () => {
  test('login works', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    expect(login.body.username).toBe('root')
  })

  test('post new blog with logged in user works correctly', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    const blogResponse = await api
      .post('/api/blogs')
      .send({
        title: 'You Can Achieve Work-Life Balance This Year',
        author: 'Michael Hyatt',
        url:
          'https://michaelhyatt.com/you-can-achieve-work-life-balance-this-year/',
        likes: 2,
      })
      .set('Authorization', `Bearer ${login.body.token}`)
    const user = await User.findOne({ username: 'root' })
    expect(user.blogs).toHaveLength(2)
    expect(blogResponse.body.user).toBe(user._id.toString())
  })

  test('post incorrect blog with logged in user responds with status code 400', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    const blogResponse = await api
      .post('/api/blogs')
      .send({
        author: 'Michael Hyatt',
        likes: 2,
      })
      .set('Authorization', `Bearer ${login.body.token}`)
    expect(blogResponse.status).toBe(400)
  })

  test('post new blog with incorrect token responds with status code 401', async () => {
    const blogResponse = await api
      .post('/api/blogs')
      .send({
        title: 'You Can Achieve Work-Life Balance This Year',
        author: 'Michael Hyatt',
        url:
          'https://michaelhyatt.com/you-can-achieve-work-life-balance-this-year/',
        likes: 2,
      })
      .set('Authorization', 'Bearer 1')
    expect(blogResponse.status).toBe(401)
  })
})

describe('DELETE', () => {
  test('delete valid blog with logged in user responds with status code 204', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    const blogToDelete = await Blog.findOne({ likes: 12 })
    const blogResponse = await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
    const blogs = await api.get('/api/blogs')
    expect(blogResponse.status).toBe(204)
    expect(blogs.body).toHaveLength(0)
  })

  test('delete invalid blog with logged in user responds with status code 400', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    const blogResponse = await api
      .delete('/api/blogs/1')
      .set('Authorization', `Bearer ${login.body.token}`)
    expect(blogResponse.status).toBe(400)
  })
})

describe('PUT', () => {
  test('update valid blog with logged in user works correctly', async () => {
    const login = await api.post('/api/login').send({
      username: 'root',
      password: process.env.ROOT_PASSWORD,
    })
    const blog = await Blog.findOne({ likes: 12 })
    const user = await User.findOne({ username: 'root' })
    const blogResponse = await api
      .put(`/api/blogs/${blog._id}`)
      .send({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 10,
        user: user._id
      })
      .set('Authorization', `Bearer ${login.body.token}`)
    expect(blogResponse.body.likes).toBe(10)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
