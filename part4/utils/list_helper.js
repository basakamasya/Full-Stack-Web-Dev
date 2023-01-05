const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  let maxElement = array[0]
  array.forEach(blog => {
    if (blog.likes > maxElement.likes) {
      maxElement = blog
    }
  })
  return { title: maxElement.title, author: maxElement.author, likes: maxElement.likes }
}

const mostBlogs = (array) => {
  let dict = Object.create(null)
  array.forEach(blog => {
    if (dict[blog.author]) {
      dict[blog.author] += 1
    }
    else    dict[blog.author] = 1
  })

  const result =  Object.entries(dict).reduce((a, b) => a[1] > b[1] ? a : b)

  return { 'author': result[0], 'blogs': result[1] }
}


const mostLikes = (array) => {
  let dict = Object.create(null)
  array.forEach(blog => {
    if (dict[blog.author]) {
      dict[blog.author] += blog.likes
    }
    else    dict[blog.author] = blog.likes
  })

  const result =  Object.entries(dict).reduce((a, b) => a[1] > b[1] ? a : b)

  return { 'author': result[0], 'likes': result[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}