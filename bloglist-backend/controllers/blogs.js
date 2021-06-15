const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  response.status(200).json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  result.populate('user', { username: 1, name: 1 }, (error, result) => {
    response.status(201).json(result)
  })
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  blog.comments = [...blog.comments, request.body.comment]
  await blog.save()
  response.status(201).json(blog)
})

blogsRouter.patch('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    {
      new: true,
      runValidators: true,
    }
  ).populate('user', { username: 1, name: 1 })
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  await Blog.findByIdAndRemove(request.params.id)
  user.blogs = user.blogs.filter(
    blog => blog.id !== mongoose.Types.ObjectId(request.params.id)
  )
  await user.save()
  response.status(204).end()
})

module.exports = blogsRouter
