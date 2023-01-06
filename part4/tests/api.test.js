const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('correct amount of blog posts are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog._id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog post coming your way',
    author: 'BA',
    url: '/new',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  const authors = response.body.map(r => r.author)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1) //checking the length is increased by one

  expect(titles).toContain( //checking the title of the post
    'New blog post coming your way'
  )
  expect(authors).toContain( //checking the author of the post
    'BA'
  )
})

afterAll(() => {
  mongoose.connection.close()
})