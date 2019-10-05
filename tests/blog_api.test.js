
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'You first blog'
    )
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('a unique id is defined', async () => {
      const response = await api.get('/api/blogs')

      const ids = response.body.map(r => r._id)
      expect(ids).toBeDefined()
    })

    test('a valid blog can be added', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({
          'username':'username1',
          'password':'12456789'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      let token = loginResponse.body.token

      const newBlog = {
        title: 'Jasna testing',
        author: 'Jasna',
        url: 'fullstackopen.com',
        likes: 1000,
        token: token
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

      const loginResponse = await api
        .post('/api/login')
        .send({
          'username':'username1',
          'password':'12456789'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      let token = 'bearer ' + loginResponse.body.token

      const newBlog = {
        title: 'Jasna testing likes',
        author: 'Jasna',
        url: 'fullstackopen.com',
        token: token
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
  })

  describe('updating of a blog', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog =  {
        title: 'Me first blog',
        author: 'Me',
        url: 'http://me.com',
        likes: 999
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs')
  
      const likes = response.body.map(r => r.likes)
  
      expect(likes).toContain(999)
    })
  })
    
  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'secret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'stormi186',
      name: 'Jasna Misimovic',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('validation tests', () => {
    test('if username is missing server returns error 400', async () => {
      const newUser = {
        name: 'James Cameron',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
    test('if password is missing server returns error 400', async () => {
      const newUser = {
        username: 'jamesC',
        name: 'James Cameron'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
    test('if username is too short server returns error 400', async () => {
      const newUser = {
        username: 'ab',
        name: 'James Cameron',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
    test('if password is too short server returns error 400', async () => {
      const newUser = {
        username: 'jamesC',
        name: 'James Cameron',
        password: 'pa'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
    test('if username already exists server returns error 400', async () => {
      const newUser = new User({ username: 'root', password: 'secret' })

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})