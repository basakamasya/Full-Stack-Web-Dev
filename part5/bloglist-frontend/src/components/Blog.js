import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
          <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={updateBlog}>like</button></p>
            <p>{blog.user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog