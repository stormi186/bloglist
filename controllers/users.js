const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1})

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const users = await User.find({})

    if (!body.username || body.username === "") {
      return response.status(400).json({
        error: 'name is missing'
      })
    }
    if (!body.password || body.password === "") {
      return response.status(400).json({
        error: 'password is missing'
      })
    }
    if (body.username.length < 3) {
      return response.status(400).json({
        error: 'username cant be shorter than 3 characters'
      })
    }
    if (body.password.length < 3) {
      return response.status(400).json({
        error: 'password cant be shorter than 3 characters'
      })
    }

    const existingUsername = users.find(o => o.username === body.username)

    if(typeof existingUsername !== 'undefined') {
      return res.status(400).json({
        error: 'that username already exists, choose another one'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter