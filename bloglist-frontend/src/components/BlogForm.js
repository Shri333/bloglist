import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create } from '../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'

const BlogForm = ({ handleClose }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCreate = event => {
    event.preventDefault()
    dispatch(create(title, author, url, user.token)).then(id => {
      setTitle('')
      setAuthor('')
      setUrl('')
      handleClose()
      if (id) {
        history.push(`/blogs/${id}`)
      }
    })
  }

  return (
    <Form className='form' onSubmit={handleCreate}>
      <Form.Control
        className='title'
        type='text'
        placeholder='Enter title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <Form.Control
        className='author'
        type='text'
        placeholder='Enter author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <Form.Control
        className='url'
        type='text'
        placeholder='Enter url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <Modal.Footer>
        <Button variant='danger' type='reset' onClick={handleClose}>
          cancel
        </Button>
        <Button className='create' variant='success' type='submit'>
          create
        </Button>
      </Modal.Footer>
    </Form>
  )
}

export default BlogForm
