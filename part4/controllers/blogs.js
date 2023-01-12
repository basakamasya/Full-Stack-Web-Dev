const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)

  if (!request.body.url) {
    response.status(400).json( { error: 'url missing' } )
  }
  if (!request.body.title) {
    response.status(400).json( { error: 'title missing' } )
  }
  else {
    const blog = new Blog( {
      title: request.body.title,
      author: request.body.author === undefined ? '' : request.body.author,
      url: request.body.url,
      likes: request.body.likes === undefined ? 0 : request.body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id)
  if (deleted) {
    response.status(204).end()
  }
  else response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updated) {
    response.json(updated)
  }
  else response.status(404).end()

})

module.exports = blogsRouter