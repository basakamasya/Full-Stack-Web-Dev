const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, author: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username) {
    return response.status(400).json({
      error: 'username must be given'
    })
  }
  if (!password) {
    return response.status(400).json({
      error: 'password must be given'
    })
  }
  else if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }
  else if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long'
    })
  }

  const existingUser = await User.findOne({ username }) //the username must be unique
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter