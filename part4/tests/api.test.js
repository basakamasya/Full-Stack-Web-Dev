const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./helper')
let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  token = await helper.addTestUser()
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
    expect(blog.id).toBeDefined()
  })
})

describe('addition of a blog', () => {

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
      .set('Authorization', `bearer ${token}`)
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

  test('fails with 401 unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'New blog post not coming your way',
      author: 'BA',
      url: '/notnew',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)


    expect(response.body).toHaveLength(helper.initialBlogs.length) //checking the length is same

    expect(titles).not.toContain( //checking the title of the post
      'New blog post not coming your way'
    )
  })

  test('likes property missing from request, defaulted to 0', async () => {
    const newBlog = {
      title: 'A brand new blog with a missing property',
      author: 'BA',
      url: '/missingproperty',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })


  test('title property missing from request, backend returns 400', async () => {
    const newBlogWithoutTitle = {
      author: 'BA',
      url: '/missingproperty',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('url property missing from request, backend returns 400', async () => {
    const newBlogWithoutUrl= {
      author: 'BA',
      title: 'This one has a title',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {

    const newBlog = {
      title: 'A very very new blog',
      author: 'BA',
      url: '/deleting',
    }

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    const responseAfterAddition = await api.get('/api/blogs')
    const blogsAfterAddition = responseAfterAddition.body

    expect(blogsAfterAddition).toHaveLength(
      helper.initialBlogs.length + 1
    )
    console.log(response.body.id)
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    response = await api.get('/api/blogs')
    const blogsAfterDeletion = response.body

    expect(blogsAfterDeletion).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAfterDeletion.map(r => r.title)

    expect(titles).not.toContain(newBlog.title) //assuming titles are unique
  })
  test('fails with status code 404 if id is not valid', async () => {
    await api
      .delete(`/api/blogs/${helper.nonExistingId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('update a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    let response = await api.get('/api/blogs')
    const blogsAtStart = response.body
    const blogToBeUpdated= blogsAtStart[0]

    blogToBeUpdated.title = 'Brand New Title'

    response = await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)

    expect(response.body.title).toContain('Brand New Title') //checking the response

    response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain( //checking all the titles in the DB
      'Brand New Title'
    )
  })

  test('fails with status code 404 if id is not valid', async () => {
    const blog = {
      title: 'This is the last test for now',
      author: 'BA',
      url: '/last',
      likes: 2,
    }
    await api
      .put(`/api/blogs/${helper.nonExistingId}`)
      .send(blog)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})