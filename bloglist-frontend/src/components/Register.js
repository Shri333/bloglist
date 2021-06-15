import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'

const Register = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = event => {
    event.preventDefault()
    if (password === confirmPassword) {
      dispatch(register(username, name, password)).then(user => {
        setUsername('')
        setName('')
        setPassword('')
        setConfirmPassword('')
        if (user) {
          history.push('/')
        }
      })
    } else {
      dispatch(notify('Passwords must match', 0))
    }
  }

  return (
    <Row>
      <Col></Col>
      <Col className='mt-5'>
        <h1 className='mb-3' style={{ textAlign: 'center' }}>
          Register
        </h1>
        <Form onSubmit={handleRegister}>
          <Form.Group>
            <Form.Control
              className='username'
              placeholder='Enter username'
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className='name'
              placeholder='Enter name'
              type='text'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className='password'
              placeholder='Enter password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className='confirmPassword'
              placeholder='Confirm password'
              type='password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </Form.Group>
          <Button variant='dark' type='submit' block>
            Register
          </Button>
        </Form>
        <p className='text-muted mt-3' style={{ textAlign: 'center' }}>
          Have an account? Login <Link to='/'>here</Link>
        </p>
      </Col>
      <Col></Col>
    </Row>
  )
}

export default Register
