import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('could not logout'))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      await blogService.create(blogObject).then(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
        dispatch(setNotification('a new blog ' +
        blogObject.title +
        ' by ' +
        blogObject.author +
        ' added'))
      })
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('could not add the blog'))
    }
  }

  const updateBlog = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log(returnedBlog)
        blogService.getAll().then((blogs) => setBlogs(blogs))
        dispatch(setNotification('Blog liked.'))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setNotification(`'${blog.title}' was already removed from server`))
        setBlogs(blogs.filter((n) => n.id !== id))
      })
  }

  const compareLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes
  }

  const deleteBlog = (id) => {
    if (blogs.find((person) => person.id === id) !== undefined) {
      if (
        window.confirm(
          `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${
            blogs.find((blog) => blog.id === id).author
          }`
        )
      ) {
        blogService
          .deleteBlog(id)
          .then(() => {
            setBlogs(blogs.filter((person) => person.id !== id))
            dispatch(setNotification('Blog deleted.'))
          })
          .catch((error) => {
            console.log(error)
            dispatch(setNotification('Something went wrong. Couldn\'t delete the person.'))
          }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </p>
      <br></br>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.sort(compareLikes) &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={() => updateBlog(blog.id)}
            removeBlog={() => deleteBlog(blog.id)}
            username={user.username}
          />
        ))}
    </div>
  )
}

export default App
