import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal } from 'react-bootstrap'

const Togglable = forwardRef(({ label, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className='mt-3'>
      <Button variant='dark' onClick={toggleVisibility}>
        {label}
      </Button>
      <Modal show={visible} onHide={toggleVisibility}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
