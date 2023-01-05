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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}