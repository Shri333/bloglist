import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { comment } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'

const CommentForm = ({ handleClose }) => {
  const [comment_, setComment] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()

  const handleComment = event => {
    event.preventDefault()
    dispatch(comment(id, comment_))
    handleClose()
    setComment('')
  }

  return (
    <Form onSubmit={handleComment}>
      <Form.Control
        type='text'
        placeholder='Enter comment'
        value={comment_}
        onChange={({ target }) => setComment(target.value)}
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

export default CommentForm
