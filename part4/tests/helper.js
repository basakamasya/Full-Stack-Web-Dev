const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Full Stack',
    url: '/html',
    likes: 0,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Full Stack',
    url: '/js',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'does not matter',
    author: 'BA',
    url: '/nope',
    likes: 0, })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  nonExistingId
}