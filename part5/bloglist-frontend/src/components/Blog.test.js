import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {

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