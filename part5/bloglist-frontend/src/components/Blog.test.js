import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'Test',
  author: 'BA',
  likes: 0,
  url: 'test',
  user: {
    name: 'BA',
    username: 'bamasya',
  },
}


test('renders blog', () => {

  const container = render(<Blog blog={blog} />)

  const div = container.getByTestId('default-info')

  expect(div).toHaveTextContent(
    'Test'
  )
  expect(div).toHaveTextContent(
    'BA'
  )
  expect(div).not.toHaveStyle(
    'display: none;'
  )

  const urlAndLikes = container.getByTestId('extra-info')
  expect(urlAndLikes).toHaveStyle(
    'display: none;'
  )

})

test('clicking the view button displays url and likes', async () => {
  const container = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = container.getByTestId('view-button')
  await user.click(button)

  const url = container.getByTestId('url')
  expect(url).toHaveTextContent(
    'test'
  )
  expect(url).not.toHaveStyle(
    'display: none;'
  )

  const likes = container.getByTestId('likes')
  expect(likes).toHaveTextContent(
    '0'
  )
  expect(likes).not.toHaveStyle(
    'display: none;'
  )

})

test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const container = render(
    <Blog blog={blog} updateBlog={mockHandler}/>
  )

  const user = userEvent.setup()

  const viewButton = container.getByTestId('view-button')
  await user.click(viewButton)

  const likeButton = container.getByTestId('like-button')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Blog Form calls event handler when new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.getByTestId('title-input')
  await user.type(titleInput, 'creating a new title')

  const authorInput = container.getByTestId('author-input')
  await user.type(authorInput, 'creating a new author')

  const urlInput = container.getByTestId('url-input')
  await user.type(urlInput, 'creating a new url')

  const sendButton = container.getByTestId('create-button')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('creating a new title')
  expect(createBlog.mock.calls[0][0].author).toBe('creating a new author')
  expect(createBlog.mock.calls[0][0].url).toBe('creating a new url')
})
