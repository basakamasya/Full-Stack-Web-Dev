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

  return Object.keys(dict).reduce(function(a, b){ return dict[a] > dict[b] ? { "author": a, "blogs": dict[a] } : { "author": b, "blogs": dict[b] } })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}