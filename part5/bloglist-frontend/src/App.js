import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem(
        'loggedUser'
      )
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('could not logout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      await blogService
        .create(blogObject)
        .then(returned => {
          setBlogs(blogs.concat(returned))
          setSuccessMessage('a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    catch (exception) {
      console.log(exception)
      setErrorMessage('could not add the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification.Error message={errorMessage} />
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
      <Notification.Success message={successMessage} />
      <Notification.Error message={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      <br></br>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
