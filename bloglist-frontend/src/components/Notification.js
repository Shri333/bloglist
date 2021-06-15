import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clear } from '../reducers/notificationReducer'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clear())
  }

  if (type === null) {
    return null
  }

  return (
    <Alert
      variant={type ? 'success' : 'danger'}
      onClose={handleClose}
      dismissible
    >
      {message}
    </Alert>
  )
}

export default Notification
