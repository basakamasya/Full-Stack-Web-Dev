import { useState } from 'react'



const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')

  const [newAuthor, setNewAuthor] = useState('')

  const [newUrl, setNewUrl] = useState('')



  const handleTitleChange = (event) => {

    setNewTitle(event.target.value)

  }

  const handleAuthorChange = (event) => {

    setNewAuthor(event.target.value)

  }

  const handleUrlChange = (event) => {

    setNewUrl(event.target.value)

  }



  const addBlog = (event) => {

    event.preventDefault()

    createBlog({

      title: newTitle,

      author: newAuthor,

      url: newUrl,

    })



    setNewTitle('')

    setNewAuthor('')

    setNewUrl('')

  }



  return (

    <div>

      <form onSubmit={addBlog}>

        <h2>create new</h2>

        <div>

          title:

          <input

            type="text"

            value={newTitle}

            name="title"

            onChange={handleTitleChange}

            data-testid="title-input"

            id="title"

          />

        </div>

        <div>

          author:

          <input

            type="text"

            value={newAuthor}

            name="author"

            onChange={handleAuthorChange}

            data-testid="author-input"

            id="author"

          />

        </div>

        <div>

          url:

          <input

            type="text"

            value={newUrl}

            name="url"

            onChange={handleUrlChange}

            data-testid="url-input"

            id="url"

          />

        </div>

        <button type="submit" data-testid="create-button" id="create">

          create

        </button>

      </form>

    </div>

  )

}



export default BlogForm

