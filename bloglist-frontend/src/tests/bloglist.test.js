import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

const dummyBlog = {
  title: 'I am the greatest human being alive',
  author: 'Shrihan Dadi',
  likes: 99,
  url: 'https://www.iamthegreatestalive.com',
  user: {
    id: '10723172308471928341',
  },
}

const dummyUser = {
  uid: '10723172308471928341',
}

test(`the component displaying a blog renders the blog's title and author, 
  but does not render its url or number of likes by default.`, () => {
  const blogComponent = render(<Blog blog={dummyBlog} user={dummyUser} />)
  const blogDetail = blogComponent.container.querySelector('.blogDetail')
  expect(blogComponent.container).toHaveTextContent(
    'I am the greatest human being alive by Shrihan Dadi'
  )
  expect(blogDetail).toHaveStyle('display: none')
})

test(`the blog's url and number of likes are shown when the 
  button controlling the shown details has been clicked.`, () => {
  const blogComponent = render(<Blog blog={dummyBlog} user={dummyUser} />)
  const likes = blogComponent.container.querySelector('.likes')
  const url = blogComponent.container.querySelector('.url')
  fireEvent.click(blogComponent.container.querySelector('.toggleVisibility'))
  expect(likes).toHaveTextContent('likes 99')
  expect(url).toHaveTextContent(dummyBlog.url)
})

test(`if the like button is clicked twice, the event handler 
  the component received as props is called twice.`, () => {
  const eventHandler = jest.fn()
  const blogComponent = render(
    <Blog blog={dummyBlog} user={dummyUser} handleUpdate={eventHandler} />
  )
  fireEvent.click(blogComponent.container.querySelector('.toggleVisibility'))
  fireEvent.click(blogComponent.container.querySelector('#like'))
  fireEvent.click(blogComponent.container.querySelector('#like'))
  expect(eventHandler.mock.calls).toHaveLength(2)
})

test(`the form calls the event handler it received as props 
  with the right details when a new blog is created.`, () => {
  const eventHandler = jest.fn()
  const formComponent = render(<BlogForm handleCreate={eventHandler} />)
  const titleInput = formComponent.container.querySelector('.title')
  const authorInput = formComponent.container.querySelector('.author')
  const urlInput = formComponent.container.querySelector('.url')
  fireEvent.change(titleInput, {
    target: { value: 'new blog post' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Shrihan Dadi' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://www.newblogpost.com' },
  })
  fireEvent.submit(formComponent.container.querySelector('.form'))
  expect(eventHandler.mock.calls[0][1]).toBe('new blog post')
  expect(eventHandler.mock.calls[0][2]).toBe('Shrihan Dadi')
  expect(eventHandler.mock.calls[0][3]).toBe('https://www.newblogpost.com')
})
