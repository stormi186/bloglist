const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a unique id is defined', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r._id)
  expect(ids).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Jasna testing',
    author: 'Jasna',
    url: 'fullstackopen.com',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'Jasna testing'
  )
})

test('if likes is missing it will be set to 0', async () => {
  await Blog.deleteMany({})

  const newBlog = {
    title: 'Jasna testing likes',
    author: 'Jasna',
    url: 'fullstackopen.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes)

  expect(likes).toContain(0)
})

test('if title and url is missing server returns error 400', async () => {
  const newBlog = {
    author: 'Jasna',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})