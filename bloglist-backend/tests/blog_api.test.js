const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const newBlog = {
  title: 'You Can Achieve Work-Life Balance This Year',
  author: 'Michael Hyatt',
  url: 'https://michaelhyatt.com/you-can-achieve-work-life-balance-this-year/',
  likes: 2,
}

const newBlogNoLikes = {
  title: 'Blog Has No Likes',
  author: 'No Likes',
  url: 'https://nolikes.com/this-blog-post-has-no-likes/',
}

const newBlogNoAuthorUrl = {
  author: 'Shrihan Dadi',
}

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of testBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET blogs', () => {
  test('api returns correct number of blog posts in JSON', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })

  test('unique identifier of blog posts is named id (not _id)', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('api returns correct blog post with specified id', async () => {
    const response = await api.get('/api/blogs/5a422b3a1b54a676234d17f9')
    expect(response.body.id).toBe('5a422b3a1b54a676234d17f9')
  })
})

describe('POST blogs', () => {
  test('request successfully creates a new blog post', async () => {
    const postResponse = await api.post('/api/blogs').send(newBlog)
    const getResponse = await api.get('/api/blogs')
    expect(postResponse.body.title).toBe(newBlog.title)
    expect(getResponse.body).toHaveLength(testBlogs.length + 1)
  })

  test('if likes is missing, should default to 0', async () => {
    const postResponse = await api.post('/api/blogs').send(newBlogNoLikes)
    expect(postResponse.body.likes).toBe(0)
  })

  test('if title and url missing, respond with status code 400', async () => {
    const postResponse = await api.post('/api/blogs').send(newBlogNoAuthorUrl)
    expect(postResponse.status).toBe(400)
  })
})

describe('DELETE blogs', () => {
  test('request successfully deletes a blog post', async () => {
    const deleteResponse = await api.delete(
      '/api/blogs/5a422a851b54a676234d17f7'
    )
    expect(deleteResponse.status).toBe(204)
  })

  test('if id is wrong, respond with status code 400', async () => {
    const deleteResponse = await api.delete('/api/blogs/1')
    expect(deleteResponse.status).toBe(400)
  })
})

describe('PUT blogs', () => {
  test('request successfully updates a blog post', async () => {
    const putResponse = await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send({
        title: 'Express Patterns',
        author: 'Michael Chan',
        url: 'http://expresspatterns.com',
        likes: 3,
      })
    expect(putResponse.body.likes).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
