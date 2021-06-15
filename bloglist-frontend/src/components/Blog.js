import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogsReducer'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import { Button, ListGroup, Modal } from 'react-bootstrap'

const Blog = () => {
  const [visible, setVisible] = useState(false)
  const id = useParams().id
  const blog = useSelector(state => {
    if (state.blogs.length) {
      return state.blogs.find(blog => blog.id === id)
    }
    return null
  })
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    dispatch(like(id, blog.likes + 1, user.token))
  }

  const handleRemove = () => {
    dispatch(remove(blog, user.token)).then(() => {
      history.push('/')
    })
  }

  if (blog === undefined) {
    return <Redirect to='/' />
  }

  if (blog === null) {
    return null
  }

  return (
    <div className='mt-3'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div className='blogDetail'>
        <a className='url' href={blog.url}>
          {blog.url}
        </a>
        <div className='likes mt-2'>
          {blog.likes} likes
          <Button
            className='like ml-2'
            variant='success'
            size='sm'
            onClick={handleLike}
          >
            like
          </Button>
        </div>
        <div className='mt-2'>added by {blog.user.name}</div>
        <Button
          className='remove mt-2'
          variant='danger'
          size='sm'
          style={{ display: blog.user.id === user.uid ? '' : 'none' }}
          onClick={toggleVisibility}
        >
          remove
        </Button>
        <Modal show={visible} onHide={toggleVisibility}>
          <Modal.Body>Remove blog {blog.title}?</Modal.Body>
          <Modal.Footer>
            <Button variant='danger' type='reset' onClick={toggleVisibility}>
              cancel
            </Button>
            <Button className='create' variant='success' onClick={handleRemove}>
              remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className='comments mt-4'>
        <h3>Comments</h3>
        <ListGroup className='mt-3'>
          {blog.comments.map(comment => (
            <ListGroup.Item>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog
