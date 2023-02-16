import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,

    paddingLeft: 2,

    border: 'solid',

    borderWidth: 1,

    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog">
      <div data-testid="default-info">
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
          <button
            onClick={toggleVisibility}
            data-testid="view-button"
            id="view"
            className="view"
          >
            view
          </button>
        </div>
        <div style={showWhenVisible} data-testid="extra-info">
          <button onClick={toggleVisibility}>hide</button>

          <p data-testid="url">{blog.url}</p>

          <p data-testid="likes">
            likes {blog.likes}{' '}
            <button
              onClick={updateBlog}
              data-testid="like-button"
              id="like"
              className="like"
            >
              like
            </button>
          </p>

          <p>{blog.user.name}</p>

          {username === blog.user.username ? (
            <p>
              <button onClick={removeBlog} id="delete">
                remove
              </button>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
