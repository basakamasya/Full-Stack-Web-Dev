const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return array.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}