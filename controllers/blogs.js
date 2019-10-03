const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || body.title === "") {
    return response.status(400).json({
      error: 'title is missing'
    })
  }
  if (!body.url || body.url === "") {
    return response.status(400).json({
      error: 'url is missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter