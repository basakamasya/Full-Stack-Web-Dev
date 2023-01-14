import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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


  const addBlog = async (event) => {
    event.preventDefault()

      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
  
      try {
        await blogService
        .create(blog)
        .then(returned => {
          setBlogs(blogs.concat(returned))
          setNewAuthor('')
          setNewTitle('')
          setNewUrl('')
          setSuccessMessage('a new blog '+ blog.title + ' by ' + blog.author + ' added')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  if (user === null) {
    return (
      <div>              
        <h2>Log in to application</h2>
        <Notification.Error message={errorMessage} />
        {loginForm()}
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
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
